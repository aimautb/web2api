const express = require('express');
const app = express(); 

const PORT = 3000;

app.use(express.urlencoded({extended : true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req , res )=>{
    res.send("<h1>SERVER IS RUNNING</h1>")
}
);

app.get('/api/random-user', async (req, res) => {
    try {
        
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();

       
        const user = data.results[0];
        const birthDate = new Date(user.dob.date);


        const cleanedUser = {
            firstName: user.name.first,
            lastName: user.name.last,
            gender: user.gender,
            age: user.dob.age,
            dateOfBirth: birthDate.toISOString().split('T')[0],
            city: user.location.city,
            country: user.location.country,
            address: `${user.location.street.name} ${user.location.street.number}`,
            picture: user.picture.large
        };

        // 3️⃣ Send cleaned data to frontend
        res.json(cleanedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch user data' });
    }
});

app.listen(PORT, ()=> {
    console.log(`The server running on the port:${PORT}`)
});
