import mongoose from 'mongoose';

let memoryServer = null;

export const connectDB = async () => {
  let uri = process.env.MONGODB_URI;

  if (process.env.STAGING_MODE === 'memory' && !uri) {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri();
    console.log('Using in-memory MongoDB for staging');
  }

  uri = uri || 'mongodb://127.0.0.1:27017/aakshi';

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');

    if (process.env.STAGING_MODE === 'memory' && process.env.AUTO_SEED === 'true') {
      const { default: seed } = await import('../seed/seedRunner.js');
      await seed();
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    console.warn('Running without MongoDB — some features will be limited');
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
};
