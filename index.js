require('dotenv').config();
const axios = require('axios');
const express = require('express');

const port = 3000;
const app = express();

app.use(express.static('public'));

app.get('/api/random-user', async (req, res) => {
    try {
        // 1. RANDOM USER API
        const userRes = await axios.get("https://randomuser.me/api/");
        const u = userRes.data.results[0];

        const userData = {
            firstName: u.name.first,
            lastName: u.name.last,
            gender: u.gender,
            profilePic: u.picture.large,
            age: u.dob.age,
            dob: u.dob.date,
            city: u.location.city,
            country: u.location.country,
            address: `${u.location.street.number} ${u.location.street.name}`
        };

        // 2. RESTCOUNTRIES API — стабильный API БЕЗ API-ключа
        const countryRes = await axios.get(`https://restcountries.com/v3.1/name/${userData.country}`);
        const c = countryRes.data[0];

        const countryInfo = {
            name: c.name?.common || userData.country,
            capital: c.capital?.[0] || "No data",
            languages: c.languages ? Object.values(c.languages).join(", ") : "No data",
            currency: c.currencies ? Object.keys(c.currencies)[0] : "USD",
            flag: c.flags?.png || ""
        };

        // 3. EXCHANGERATE API
        const currencyCode = countryInfo.currency;
      


        const exchangeRes = await axios.get(
            `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGERATE_API_KEY}/latest/${currencyCode}`
        );

        const rates = {
            USD: exchangeRes.data.conversion_rates.USD,
            KZT: exchangeRes.data.conversion_rates.KZT
        };
      

        // 4. NEWS API
        const newsRes = await axios.get(
            `https://newsapi.org/v2/everything?q=${userData.country}&language=en&pageSize=5&apiKey=${process.env.NEWS_API_KEY}`
        );

        const news = newsRes.data.articles.map(article => ({
            title: article.title,
            image: article.urlToImage,
            description: article.description,
            url: article.url
        }));

        // SEND ALL DATA TO FRONTEND
        res.json({
            user: userData,
            country: countryInfo,
            rates,
            news
        });

    } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        res.status(500).json({ error: "API request failed" });
    }
});

app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
);
