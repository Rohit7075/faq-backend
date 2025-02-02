const mongoose=require('mongoose');

const connectDB = async () => {
    // const mongoURI="mongodb+srv://dubeyrohit7076:NPIHPoPHwgGbj6wL@cluster0.lgljb.mongodb.net/"
         const mongoURI = "mongodb+srv://rohit1osc:0VuPaBi3Ti4MMChd@cluster0.fgmzs.mongodb.net/"

    try {
        await mongoose.connect( mongoURI );
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;