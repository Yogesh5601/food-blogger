import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://shrivasyogesh2000:yogi5601@cluster0.uuq878i.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => {
    console.log("db connected");
})
.catch(() => {
    console.log("db conn error")
})