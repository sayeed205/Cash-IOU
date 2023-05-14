import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { TransactionRoom } from './schemas/transaction-room.schema';

@Injectable()
export class TransactionRoomService {
    constructor(
        @InjectModel(TransactionRoom.name)
        private readonly transactionRoomModel: Model<TransactionRoom>,
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
    ) {}

    async createTransactionRoom(roomInfo: {
        user: User;
        name: string;
        phone: string;
    }) {
        const { user, name, phone } = roomInfo;

        // Find if a user exists in the db with the given phone number
        const userExists = await this.userModel.findOne({ phone });

        // If user exists, check if transaction room exists
        if (userExists) {
            const transactionRoomExists =
                await this.transactionRoomModel.findOne({
                    members: { $all: [user._id, userExists._id] },
                });

            // If transaction room exists, and check roomDetails for the user
            if (transactionRoomExists) {
                const userExistsInRoomDetails =
                    transactionRoomExists.roomDetails.filter(el => {
                        el.userId === user._id;
                    });

                // If user exists in roomDetails, return the transaction room
                if (userExistsInRoomDetails) return transactionRoomExists;

                // If user doesn't exist in roomDetails, add user to roomDetails
                transactionRoomExists.roomDetails.push({
                    userId: user._id,
                    name: user.name,
                    // TODO)): add user's profile picture
                });

                // Save the transaction room
                await transactionRoomExists.save();

                // Return the transaction room
                return transactionRoomExists;
            }

            // If transaction room doesn't exist, create it
            const newTransactionRoom = await this.transactionRoomModel.create({
                members: [user._id, userExists._id],
                roomDetails: [{ userId: user._id, name }], // TODO)): add user's profile picture
            });

            // Return the transaction room
            return newTransactionRoom;
        }

        // If user doesn't exist, create a new user with the given phone number
        const newUser = await this.userModel.create({ phone });

        // Create a new transaction room with the new user and the given user
        const newTransactionRoom = await this.transactionRoomModel.create({
            members: [user._id, newUser._id],
            roomDetails: [{ userId: user._id, name }], // TODO)): add user's profile picture
        });

        // Return the transaction room
        return newTransactionRoom;
    }

    async getTransactionRooms(user: User) {
        // Find all transaction rooms where the given user is a member in the members array
        const transactionRooms = await this.transactionRoomModel.find({
            members: { $in: [user._id] },
        });

        // Return the transaction rooms
        return transactionRooms; // TODO)): add pagination
    }
}
