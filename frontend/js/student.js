document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/student/courses", {
        headers: { Authorization: `Bearer ${token}` }
    });

    const courses = await response.json();
    const courseContainer = document.getElementById("courses");

    courses.forEach(course => {
        const courseElement = document.createElement("div");
        courseElement.innerHTML = `
            <p>${course.title} - Seats: ${course.availableSeats}</p>
            <button onclick="registerCourse('${course._id}')">Register</button>
        `;
        courseContainer.appendChild(courseElement);
    });
});

async function registerCourse(courseId) {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/student/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ courseId }),
    });

    const data = await response.json();
    alert(data.message);
}
