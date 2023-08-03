import mongoose from "mongoose";

const CusSchema =mongoose.Schema
const customerSchema = new CusSchema({
  shopkeeperId: {
    type: CusSchema.Types.ObjectId,
    ref: "Shopkeeper",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number:{
    type:Number,
    require:true
  },
  userName_1:{
    type:String,
    unique:false
  }
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer
