module.exports.HarvsineFormula = "BEGIN SELECT id, (   6371 *   acos(cos(radians(clientLat)) *    cos(radians(latitude)) *    cos(radians(longitude) - 
   radians(clientLong)) + 
   sin(radians(clientLat)) * 
   sin(radians(latitude)))
) AS distance 
FROM providers 
HAVING distance < 10
ORDER BY distance;

END"