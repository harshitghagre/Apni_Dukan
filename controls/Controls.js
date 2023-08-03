import Shopkeeper from "../model/Shopkeeper.js";
import Customer from "../model/Customer.js"
import bcrypt from "bcryptjs"

export const getAllShopkeeper = async (req, res, next) => {
    let Shopkeepers;
    try {
        Shopkeepers = await Shopkeeper.find();
    } catch (err) {
        console.log(err);
    }
    if (!Shopkeepers) {
        return res.status(404).json({ message: "No Customer found" });
    }
    return res.status(200).json({ Shopkeepers });
};



export const signup = async (req, res, next) => {
    // Create a new user object with the data received in request body and save it to database using

    const { firstName, lastName, userName, email, password, address } = req.body;

    let existingShopkeeper;
    try {
        existingShopkeeper = await Shopkeeper.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (existingShopkeeper) {
        return res
            .status(400)
            .json({ message: "user already exists ! login insted" });
    }

    const hashedPassword = bcrypt.hashSync(password);

    const shopkeper = new Shopkeeper({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        address,
    });

    try {
        await shopkeper.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ shopkeper, message:"successfull registration" });
};




export const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingShopkeeper;
    try {
        existingShopkeeper = await Shopkeeper.findOne({ email });
    } catch (err) {
        return console.log(err);
    }

    if (!existingShopkeeper) {
        return res
            .status(404)
            .json({ message: "not find user by this email i am login" });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingShopkeeper.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect password" })
    }
    return res.status(200).json({ message: "login successfull", customer: existingShopkeeper })

};




export const customerSignup = async (req, res, next) => {
    const { shopkeeperId, firstName, lastName, email, number } = req.body;

    let existingCustomer;
    try {
        existingCustomer = await Customer.findOne({email });
    } catch (err) {
        return console.log(err);
    }

    if (existingCustomer) {
        return res.status(400).json({ message: "Customer already exists" });
    }


    const customer = new Customer({
        shopkeeperId,
        firstName,
        lastName,
        email,
        number,
    });

    try {
        await customer.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ customer, message: "Successfull registration" });
};


export const customerLogin = async (req, res, next) => {
    const {email, number } = req.body;

    let existingCustomer;
    try {
        existingCustomer = await Customer.findOne({ email, number });
    } catch (err) {
        return console.log(err);
    }
    if (!existingCustomer) {
        return res.status(404).json({ message: "Customer not found" });
    }
    // const isPasswordCorrect = bcrypt.compareSync(password, existingCustomer.password);
    // if (!isPasswordCorrect) {
    //     return res.status(400).json({ message: "Incorrect password" });
    // }
    return res.status(200).json({ message: "Customer login successful", customer: existingCustomer });
};


export const getCustomer = async (req, res, next) => {
    let customer;
    try {
        customer = await Customer.find();
    } catch (err) {
        console.log(err);
    }
    if (!customer) {
        return res.status(404).json({ message: "No Customer found" });
    }
    return res.status(200).json({ customer });
};