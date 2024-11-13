import mongoose, { Document, Schema  } from 'mongoose';

interface IUser extends Document {
    username: string;
    profileImage: string;
    githubId: string;
    sessionToken: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    username: {
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
    sessionToken: {
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

const User = mongoose.model<IUser>('User', userSchema);

export default User;
