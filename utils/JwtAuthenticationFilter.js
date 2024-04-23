// Import required dependencies
// Note: You need to provide the implementation for HttpServletRequest, HttpServletResponse, ServletException, IOException,
// UserDetails, UsernamePasswordAuthenticationToken, SecurityContextHolder, WebAuthenticationDetailsSource, UserServiceImpl, UserRepository, JwtUtils, FilterChain, and OncePerRequestFilter
const { SecurityContextHolder, UsernamePasswordAuthenticationToken } = require('some-security-context-holder-library'); // Example security context holder library
const { WebAuthenticationDetailsSource } = require('some-web-authentication-details-source-library'); // Example web authentication details source library
const { ServletException, IOException } = require('some-exceptions-library'); // Example exceptions library

// Define JwtAuthenticationFilter class
class JwtAuthenticationFilter extends OncePerRequestFilter {
    constructor(utils, userService) {
        super();
        this.utils = utils;
        this.userService = userService;
    }

    async doFilterInternal(request, response, filterChain) {
        let token = null;
        let authorisationHeader = null;
        let username = null;
        let userDetail = null;

        authorisationHeader = request.getHeader("Authorization");

        if (authorisationHeader != null && authorisationHeader.startsWith("Bearer ")) {
            token = authorisationHeader.substring(7);
            username = this.utils.extractUsername(token);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            userDetail = await this.userService.loadUserByUsername(username);

            if (userDetail != null && this.utils.isTokenValid(token, userDetail.getUsername())) {
                const usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetail, null, userDetail.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}

module.exports = JwtAuthenticationFilter;
