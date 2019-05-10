'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    // Add altering commands here.
    // Return a promise to correctly handle asynchronicity.

    return queryInterface.bulkInsert('Washrooms', [{
      nameOfPlace: 'Kinton Ramen',
      address: '90 Eglinton Ave. East, Unit 108',
      overallRating: 7,
      comment: 'The soap seemed to be very watered down. Bonus points for the complimentary mouth wash and tooth picks. Would definitely poop again.',
      createdAt: "2001-01-01 00:00:00.000",
      updatedAt: "2001-01-01 00:00:00.000"
    }, 
    {
      nameOfPlace: 'Han Ba Tang',
      address: '4862 Yonge Street',
      overallRating: 7,
      comment: 'I found it very weird that the inside of the stalls did not match the same rustic wood panelling as the rest of the bathroom.',
      createdAt: "2001-01-01 00:00:00.000",
      updatedAt: "2001-01-01 00:00:00.000"
    }, {
      nameOfPlace: 'Pancho y Emiliano',
      address: '291 King Street West',
      overallRating: 7,
      comment: 'Absolutely spotless, apart from single piece of toilet paper next to the toilet. Loved the subway tiles and the vintage hand dryer. Bonus points for having both paper towel and hand dryer. Would definitely poop again.',
      createdAt: "2001-01-01 00:00:00.000",
      updatedAt: "2001-01-01 00:00:00.000"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Washrooms', [{
      nameOfPlace: 'Kinton Ramen'
    },
    {
      nameOfPlace: 'Han Ba Tang'
    }, {
      nameOfPlace: 'Pancho y Emiliano'
    }])
  }
};
