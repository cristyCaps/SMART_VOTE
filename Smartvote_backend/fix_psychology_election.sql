-- Fix Psychology election status to ACTIVE
-- This will make Psychology elections visible to Psychology students

UPDATE elections 
SET status = 'ACTIVE' 
WHERE organization = 'PSYCHOLOGY' 
AND id = (
    SELECT id FROM (
        SELECT id FROM elections 
        WHERE organization = 'PSYCHOLOGY' 
        ORDER BY created_at DESC 
        LIMIT 1
    ) AS latest_psychology_election
);

-- Verify the update
SELECT id, title, organization, status, start_date, end_date 
FROM elections 
WHERE organization = 'PSYCHOLOGY' 
ORDER BY created_at DESC;




