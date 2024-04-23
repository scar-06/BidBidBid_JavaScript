// Import required dependencies
// Note: You need to provide the implementation for UserRepository, PasswordEncoder, UserDetails, UsernameNotFoundException, UserDto, Users, and ObjectMapper
const { UserDetails, UsernameNotFoundException } = require('some-user-details-library'); // Example user details library
const { ObjectMapper } = require('some-object-mapper-library'); // Example object mapper library

// Define UserServiceImpl class
class UserServiceImpl {
    constructor(userRepository, passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    async loadUserByUsername(username) {
        try {
            const user = await this.userRepository.findByUsername(username);
            if (!user) {
                throw new UsernameNotFoundException('Username not found');
            }
            return user;
        } catch (error) {
            throw new UsernameNotFoundException('Username not found');
        }
    }

    async saveUser(userDto) {
        try {
            const user = ObjectMapper.convertValue(userDto, Users);
            user.password = this.passwordEncoder.encode(userDto.password);
            user.bid = userDto.bid;
            user.email = userDto.email;
            return await this.userRepository.save(user);
        } catch (error) {
            throw error; // Handle error appropriately
        }
    }
}

module.exports = UserServiceImpl;
