document.addEventListener('DOMContentLoaded', () => {
    console.log('Hotel Management System Initialized');

    // Handle Form Submissions (Booking)
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const bookingData = {
                id: Date.now(),
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                roomType: document.getElementById('room-type').value,
                checkIn: document.getElementById('check-in').value,
                checkOut: document.getElementById('check-out').value,
                guests: document.getElementById('guests').value,
                status: 'Confirmed'
            };
            
            // Save to LocalStorage
            saveBooking(bookingData);
            alert('Booking Confirmed! Thank you, ' + bookingData.name);
            bookingForm.reset();
        });
    }

    // Handle Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for contacting us! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Admin Dashboard Initialization
    if (window.location.pathname.includes('admin.html')) {
        renderAdminDashboard();
    }
});

function saveBooking(data) {
    let bookings = JSON.parse(localStorage.getItem('hotel_bookings')) || [];
    bookings.push(data);
    localStorage.setItem('hotel_bookings', JSON.stringify(bookings));
}

function renderAdminDashboard() {
    const tableBody = document.getElementById('admin-bookings-table');
    if (!tableBody) return;

    let bookings = JSON.parse(localStorage.getItem('hotel_bookings')) || [];
    
    if (bookings.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No bookings found.</td></tr>';
        return;
    }

    tableBody.innerHTML = bookings.map(b => `
        <tr>
            <td>${new Date(b.id).toLocaleDateString()}</td>
            <td>${b.name}</td>
            <td>${b.roomType}</td>
            <td>${b.checkIn} to ${b.checkOut}</td>
            <td>${b.guests}</td>
            <td><span class="badge bg-success">${b.status}</span></td>
        </tr>
    `).join('');
}
