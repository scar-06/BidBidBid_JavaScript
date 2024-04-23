class BidServiceImpl {
    constructor(bidsRepository, collectionsRepository, userRepository) {
        this.bidsRepository = bidsRepository;
        this.collectionsRepository = collectionsRepository;
        this.userRepository = userRepository;
        this.bidsToCollection = [];
    }

    async getAllBids() {
        try {
            const allBids = await this.bidsRepository.findAll();
            return new ResponseEntity(allBids, HttpStatus.OK);
        } catch (error) {
            return new ResponseEntity("Failed to fetch bids", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getBidById(bidId) {
        try {
            const bid = await this.bidsRepository.findById(bidId);
            if (!bid) {
                throw new ResourceNotFoundException('Bid not found');
            }
            return new ResponseEntity(bid, HttpStatus.OK);
        } catch (error) {
            return new ResponseEntity(error.message, HttpStatus.NOT_FOUND);
        }
    }

    async addBidToCollection(bidDto) {
        try {
            // Convert bidDto to Bids class using ObjectMapper (Assuming ObjectMapper is asynchronous)
            const bid = await new ObjectMapper().convertValue(bidDto, Bids);
            
            // Check if bid with the same ID already exists
            const existingBid = await this.bidsRepository.findById(bid.id);
            if (existingBid) {
                return new ResponseEntity(`Bid with ID ${bid.id} has already been added`, HttpStatus.BAD_REQUEST);
            }

            // Add bid to collection
            this.bidsToCollection.push(bid);

            // Update collection with bids
            const collection = await this.collectionsRepository.findById(bid.id);
            if (!collection) {
                throw new ResourceNotFoundException('Collection not found');
            }
            collection.bidsInCollection = this.bidsToCollection;

            // Save bid and collection
            await this.bidsRepository.save(bid);
            await this.collectionsRepository.save(collection);

            return new ResponseEntity(`Bid with ID ${bid.id} added successfully`, HttpStatus.OK);
        } catch (error) {
            return new ResponseEntity(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateBidById(bidId, bidsDTO) {
        try {
            const bid = await this.bidsRepository.findById(bidId);
            if (!bid) {
                return new ResponseEntity(`Bid with ID ${bidId} not found`, HttpStatus.NOT_FOUND);
            }
            // Update bid properties with values from bidsDTO
            bid.collection = bidsDTO.collection;
            bid.price = bidsDTO.price;
            bid.user = bidsDTO.user;
            bid.status = bidsDTO.status;

            // Save updated bid
            await this.bidsRepository.save(bid);

            return new ResponseEntity("Bid updated successfully", HttpStatus.OK);
        } catch (error) {
            return new ResponseEntity(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteBidById(bidId) {
        try {
            const bid = await this.bidsRepository.findById(bidId);
            if (!bid) {
                return new ResponseEntity(`Bid with ID ${bidId} not found`, HttpStatus.NOT_FOUND);
            }
            await this.bidsRepository.delete(bid);
            return new ResponseEntity(`Bid with ID ${bidId} is deleted successfully`, HttpStatus.OK);
        } catch (error) {
            return new ResponseEntity(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = BidServiceImpl;
