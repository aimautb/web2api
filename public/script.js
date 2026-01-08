document.getElementById('getUserButton').addEventListener('click', async () => {
  const displayArea = document.getElementById('displayArea');
  displayArea.innerHTML = '<p>Loading...</p>';

  try {
    const res = await fetch('/api/random-user');
    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    displayArea.innerHTML = `
      <section class="user-card">
        <img src="${data.user.profilePic}" alt="Profile Picture">
        <div>
          <h2>${data.user.firstName} ${data.user.lastName}</h2>
          <p>Gender: ${data.user.gender}</p>
          <p>Age: ${data.user.age} (${new Date(data.user.dob).toLocaleDateString()})</p>
          <p>${data.user.address}, ${data.user.city}, ${data.user.country}</p>
        </div>
      </section>

     
      <section class="country-card">
        <h3>${data.country.name}</h3>
        <img src="${data.country.flag}" alt="National Flag">
        <p>Capital: ${data.country.capital}</p>
        <p>Official Language(s): ${data.country.languages || 'N/A'}</p>
        <p>Currency: ${data.country.currency}</p>
        <p>1 ${data.country.currency} = ${data.rates.USD} USD</p>
        <p>1 ${data.country.currency} = ${data.rates.KZT} KZT</p>
      </section>


      <section class="news-section">
        <h3>News Headlines from ${data.user.country}</h3>
        ${data.news.map(n => `
          <div class="news-item">
            <h4>${n.title}</h4>
            ${n.image ? `<img src="${n.image}" alt="News Image" />` : ''}
            <p>${n.description}</p>
            <a href="${n.url}" target="_blank">Read more</a>
          </div>
        `).join('')}
      </section>
    `;
  } catch {
    displayArea.innerHTML = '<p>Error loading data. Please try again.</p>';
  }
});