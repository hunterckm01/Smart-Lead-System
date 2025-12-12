import User from '../models/user.model.js'

export async function userRegister(req, res){
    try{
        const {name} = req.body;
        const lowerCaseName = name.toLowerCase();
        const isAvailable = await User.find({name: lowerCaseName });
        if(isAvailable.length){
            return res.status(400).json({
                message: "User Already Exist"
            })
        }
        const result = await fetch(
          `https://api.nationalize.io?name=${lowerCaseName}`
        );
        if(!result){
            throw new Error("Didn't get data");
            return;
        }
        const data = await result.json();
        const confidence = data.country[0].probability.toFixed(2);
        const country = data.country[0].country_id;

        let userStatus = "To Check";
        if(confidence > 0.6)
            userStatus = "Verified";

        const newUser = await User.create({
          name: lowerCaseName,
          countryCode: country,
          confidence,
          status: userStatus,
        });

        newUser.save();
        console.log(`New user created successfully with ${name}`)
        return res.status(201).json({
            name, result, confidence, country, userStatus
        })
    }
    catch(err){
        console.log("Error Found while sending request");
        console.error(err);
    }
}

export async function userVerified(req, res){
    try{
        const users = await User.find({status: "Verified"});

        return res.status(200).json({
            users
        })
    }
    catch(err){
        console.error(err);
    }
}

export async function userToCheck(req, res){
    try {
      const users = await User.find({ status: "To Check" });

      return res.status(200).json({
        users,
      });
    } catch (err) {
      console.error(err);
    }
}

export async function getAllUser(req, res){
    try{
        const allUser = await User.find({});
        return res.status(200).json({
            allUser
        })
    }
    catch(err){
        console.error("Error Found", err);
    }
}
