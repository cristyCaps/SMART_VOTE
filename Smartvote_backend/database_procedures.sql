-- Database stored procedures for SSG Election System

-- Create Election
DELIMITER //
CREATE PROCEDURE CreateElection(
    IN _title VARCHAR(255),
    IN _description TEXT,
    IN _start_date DATETIME,
    IN _end_date DATETIME,
    IN _admin_id VARCHAR(100),
    IN _organization VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 0 as retVal, 'Error creating election' as resmsg;
    END;
    
    START TRANSACTION;
    
    INSERT INTO elections (title, description, start_date, end_date, status, admin_id, organization, created_at)
    VALUES (_title, _description, _start_date, _end_date, 'INACTIVE', _admin_id, _organization, NOW());
    
    SELECT 1 as retVal, 'Election created successfully' as resmsg, LAST_INSERT_ID() as election_id;
    
    COMMIT;
END //
DELIMITER ;

-- Get All Elections
DELIMITER //
CREATE PROCEDURE GetAllElections()
BEGIN
    SELECT * FROM elections ORDER BY created_at DESC;
END //
DELIMITER ;

-- Get Active Elections
DELIMITER //
CREATE PROCEDURE GetActiveElections()
BEGIN
    SELECT * FROM elections 
    WHERE status = 'ACTIVE' 
    AND start_date <= NOW() 
    AND end_date >= NOW()
    ORDER BY created_at DESC;
END //
DELIMITER ;

-- Get Election By ID
DELIMITER //
CREATE PROCEDURE GetElectionById(IN _id INT)
BEGIN
    SELECT * FROM elections WHERE id = _id;
END //
DELIMITER ;

-- Update Election Status
DELIMITER //
CREATE PROCEDURE UpdateElectionStatus(
    IN _id INT,
    IN _status VARCHAR(50),
    IN _admin_id VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 0 as retVal, 'Error updating election status' as resmsg;
    END;
    
    START TRANSACTION;
    
    UPDATE elections 
    SET status = _status, updated_at = NOW()
    WHERE id = _id;
    
    SELECT 1 as retVal, 'Election status updated successfully' as resmsg;
    
    COMMIT;
END //
DELIMITER ;

-- Cast Vote
DELIMITER //
CREATE PROCEDURE CastVote(
    IN _voter_id VARCHAR(100),
    IN _election_id INT,
    IN _candidate_id INT,
    IN _position VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 0 as retVal, 'Error casting vote' as resmsg;
    END;
    
    START TRANSACTION;
    
    -- Check if voter has already voted in this election
    IF EXISTS (SELECT 1 FROM votes WHERE voter_id = _voter_id AND election_id = _election_id) THEN
        SELECT 0 as retVal, 'You have already voted in this election' as resmsg;
    ELSE
        -- Insert the vote
        INSERT INTO votes (voter_id, election_id, candidate_id, position, voted_at)
        VALUES (_voter_id, _election_id, _candidate_id, _position, NOW());
        
        SELECT 1 as retVal, 'Vote cast successfully' as resmsg;
    END IF;
    
    COMMIT;
END //
DELIMITER ;

-- Check if Voter has Voted
DELIMITER //
CREATE PROCEDURE HasVoted(
    IN _voter_id VARCHAR(100),
    IN _election_id INT
)
BEGIN
    SELECT 
        CASE 
            WHEN COUNT(*) > 0 THEN 1 
            ELSE 0 
        END as has_voted
    FROM votes 
    WHERE voter_id = _voter_id AND election_id = _election_id;
END //
DELIMITER ;

-- Get Election Results
DELIMITER //
CREATE PROCEDURE GetElectionResults(IN _election_id INT)
BEGIN
    SELECT 
        v.position,
        v.candidate_id,
        c.firstname,
        c.lastname,
        c.course,
        COUNT(v.id) as vote_count
    FROM votes v
    JOIN candidates c ON v.candidate_id = c.id
    WHERE v.election_id = _election_id
    GROUP BY v.position, v.candidate_id, c.firstname, c.lastname, c.course
    ORDER BY v.position, vote_count DESC;
END //
DELIMITER ;

-- Get Candidates for Election Position
DELIMITER //
CREATE PROCEDURE GetCandidatesForElection(
    IN _election_id INT,
    IN _position VARCHAR(100)
)
BEGIN
    SELECT DISTINCT
        c.id,
        c.firstname,
        c.lastname,
        c.course,
        c.advocacy,
        c.position
    FROM candidates c
    WHERE c.position = _position 
    AND c.status = 'Accepted'
    AND c.organization = (SELECT organization FROM elections WHERE id = _election_id)
    ORDER BY c.firstname, c.lastname;
END //
DELIMITER ;

-- Get Election Positions
DELIMITER //
CREATE PROCEDURE GetElectionPositions(IN _election_id INT)
BEGIN
    SELECT DISTINCT position
    FROM candidates c
    WHERE c.status = 'Accepted'
    AND c.organization = (SELECT organization FROM elections WHERE id = _election_id)
    ORDER BY 
        CASE position
            WHEN 'President' THEN 1
            WHEN 'Vice President' THEN 2
            WHEN 'Secretary' THEN 3
            WHEN 'Treasurer' THEN 4
            WHEN 'Auditor' THEN 5
            WHEN 'PIO' THEN 6
            WHEN 'Business Manager' THEN 7
            ELSE 8
        END;
END //
DELIMITER ;

-- Get Voter History
DELIMITER //
CREATE PROCEDURE GetVoterHistory(IN _voter_id VARCHAR(100))
BEGIN
    SELECT 
        e.title as election_title,
        e.organization,
        v.position,
        c.firstname,
        c.lastname,
        v.voted_at
    FROM votes v
    JOIN elections e ON v.election_id = e.id
    JOIN candidates c ON v.candidate_id = c.id
    WHERE v.voter_id = _voter_id
    ORDER BY v.voted_at DESC;
END //
DELIMITER ;

-- Create necessary tables if they don't exist
CREATE TABLE IF NOT EXISTS elections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    status ENUM('INACTIVE', 'ACTIVE', 'COMPLETED') DEFAULT 'INACTIVE',
    admin_id VARCHAR(100) NOT NULL,
    organization VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voter_id VARCHAR(100) NOT NULL,
    election_id INT NOT NULL,
    candidate_id INT NOT NULL,
    position VARCHAR(100) NOT NULL,
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (election_id) REFERENCES elections(id) ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    UNIQUE KEY unique_vote (voter_id, election_id, position)
);
