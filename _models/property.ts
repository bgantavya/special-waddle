import mongoose, { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        location: { type: String, required: true },
        images: [{ type: String }],
        status: {
            type: String,
            enum: ["available", "sold"],
            default: "available",
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        interestedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        propertyType: {  // Renamed from 'type' to 'propertyType'
            type: String,
            enum: ["agriculture", "industrial", "residential", "flats", "office"],
            required: true,
        },
    },
    { timestamps: true }
);

const Property = models.Property || model("Property", PropertySchema);
export default Property;
