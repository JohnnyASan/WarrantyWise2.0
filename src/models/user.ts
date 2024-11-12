import { Document, Schema, model  } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    profileImage: string;
    githubId: string;
    githubToken: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        required: false
    },
    githubId: {
        type: String,
        required: true,
        unique: true
    },
    githubToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const User = model<IUser>('User', userSchema);

export default User;
