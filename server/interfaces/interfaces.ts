import { Document, Types } from 'mongoose';

interface ImongooseUser extends Document {
    userId: Types.ObjectId;
    username: string;
    email: string;
    password: string;
    subscription: {
      type: string;
      limit: number;
      usage: number;
    };
    apiKey: string;
    stripeCustomerId: string;
  }
  
  export default ImongooseUser