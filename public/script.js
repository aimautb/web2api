const button = document.getElementById('getUserBtn');
const userCard = document.getElementById('userCard');

button.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/random-user');
        const user = await response.json();

        userCard.innerHTML = `
            <div class="card">
                <img src="${user.picture}" alt="User Photo">
                <h2>${user.firstName} ${user.lastName}</h2>
                <p><strong>Gender:</strong> ${user.gender}</p>
                <p><strong>Age:</strong> ${user.age}</p>
                <p><strong>Date of Birth:</strong> ${user.dateOfBirth}</p>
                <p><strong>City:</strong> ${user.city}</p>
                <p><strong>Country:</strong> ${user.country}</p>
                <p><strong>Address:</strong> ${user.address}</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        userCard.innerHTML = '<p>Failed to load user</p>';
    }
});
