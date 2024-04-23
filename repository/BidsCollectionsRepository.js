// Assuming you have the necessary dependencies imported
const { JpaRepository } = require('your-jpa-repository-library');

class BidCollectionsRepository extends JpaRepository {
  async findAllById(id) {
    return await this.findAll({ where: { id } });
  }

  async findById(id) {
    return await this.findOne({ where: { id } });
  }
}


