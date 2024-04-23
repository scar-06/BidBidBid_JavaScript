const fs = require('fs');
const { promisify } = require('util');
const { UserRepository } = require('./path/to/UserRepository'); // Example UserRepository import

class UsersUtils {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async readUserCSV() {
        try {
            const readFileAsync = promisify(fs.readFile);
            const data = await readFileAsync('csv/users-base.csv', 'utf8');
            const lines = data.split('\n');
            let lineOne = false;

            for (const line of lines) {
                const users = line.split(',');
                if (lineOne) {
                    const userInfo = {
                        id: Number(users[0]),
                        username: users[1],
                        email: users[2]
                    };
                    await this.userRepository.save(userInfo);
                }
                lineOne = true;
            }
        } catch (error) {
            throw new Error(`Failed to read user CSV: ${error.message}`);
        }
    }
}

module.exports = UsersUtils;
