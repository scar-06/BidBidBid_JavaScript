// Import required dependencies
// Note: You need to provide the implementation for Keys, LocalDateTime, ZoneId, StandardCharsets, Jwts, Claims, and other dependencies
const { Keys, LocalDateTime, ZoneId, StandardCharsets, Jwts, Claims } = require('some-jwt-library'); // Example JWT library

// Define JwtUtils class
class JwtUtils {
    constructor() {
        // Define getKey function as a property
        this.getKey = () => {
            const key = Keys.hmacShaKeyFor("f203affef60b6079a96a37a3c6835f42cca1e91c963cfbe5099dd1c776e0fc4c8b2dbb6b76055255e336e940171385869d8afcf9fff80f7ce6f104a6659d3812".getBytes(StandardCharsets.UTF_8));
            return new SecretKeySpec(key.getEncoded(), key.getAlgorithm());
        };

        // Define expirationTime function as a property
        this.expirationTime = () => {
            return Date.from(LocalDateTime.now()
                .plusMinutes(60)
                .atZone(ZoneId.systemDefault())
                .toInstant());
        };
    }

    // Define createJwt method
    createJwt(userDetails) {
        const claims = {};
        return Jwts.builder()
            .signWith(this.getKey())
            .claims(claims)
            .subject(userDetails.getUsername())
            .issuedAt(new Date(Date.now()))
            .expiration(this.expirationTime())
            .compact();
    }

    // Define extractClaim method
    extractClaim(token, claimResolver) {
        const claims = Jwts.parser().verifyWith(this.getKey()).build()
            .parseSignedClaims(token)
            .getPayload();
        return claimResolver(claims);
    }

    // Define extractUsername method
    extractUsername(token) {
        return this.extractClaim(token, (claims) => claims.getSubject());
    }

    // Define extractExpirationTime method
    extractExpirationTime(token) {
        return this.extractClaim(token, (claims) => claims.getExpiration());
    }

    // Define isTokenExpired method
    isTokenExpired(token) {
        return this.extractExpirationTime(token) > new Date(Date.now());
    }

    // Define isTokenValid method
    isTokenValid(token, username) {
        return this.isTokenExpired(token) && this.extractUsername(token) === username;
    }
}

module.exports = JwtUtils;
