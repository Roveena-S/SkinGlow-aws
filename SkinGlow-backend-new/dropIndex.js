const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/skinglow')
  .then(async () => {
    console.log('Connected to MongoDB');
    await mongoose.connection.db.collection('orders').dropIndex('orderNumber_1');
    console.log('Index dropped successfully');
    process.exit();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
