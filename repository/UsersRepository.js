// Assuming you have the necessary dependencies imported
const { Optional } = require('java.util');

interface UserRepository {
  findByUsername(username) {
    return Optional.ofNullable(/* implementation */);
  }

  existsByUsername(username) {
    return /* implementation */;
  }
}

