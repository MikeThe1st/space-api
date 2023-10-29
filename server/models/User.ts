import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId },
        username: { type: String, min: 4, max: 60, required: true, unique: true },
        email: { type: String, required: true, unique: true, max: 60 },
        password: { type: String, required: true, min: 5 },
        subscription: {
            type: {type: String},
            limit: { type: Number },
            usage: { type: Number }
        },
        apiKey: { type: String },
        stripeCustomerId: {type: String},
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
