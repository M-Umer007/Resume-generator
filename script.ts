// Define the Education, WorkExperience, and Skill types to ensure consistency in the data structure.
type Education = {
    institution: string;
    degree: string;
    startDate: string;
    endDate?: string;
};

type WorkExperience = {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
};

type Skill = {
    name: string;
    level: string;
};




// Arrays to store the user's education, work experience, and skills entries.
const educationList: Education[] = [];
const workExperienceList: WorkExperience[] = [];
const skillsList: Skill[] = [];





// Wait for the DOM to load before running any script so all elements are available.
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')!;
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents the form from submitting in the traditional way
    });



    // Getting references to buttons and adding event listeners to each
    const addEducationButton = document.getElementById('add-education')!;
    const addWorkExperienceButton = document.getElementById('add-work-experience')!;
    const addSkillButton = document.getElementById('add-skill')!;
    const submitButton = document.getElementById('submit')!;
    



    // When these buttons are clicked, they call the function to add a form section.
    addEducationButton.addEventListener('click', () => addFormSection('education-list', 'education-item'));
    addWorkExperienceButton.addEventListener('click', () => addFormSection('work-experience-list', 'work-experience-item'));
    addSkillButton.addEventListener('click', () => addFormSection('skills-list', 'skill-item'));
    
    // Generate the resume when the submit button is clicked.
    submitButton.addEventListener('click', () => generateResume());
});





// Adds a new form section (either for education, work experience, or skill) based on the clicked button.
function addFormSection(containerId: string, itemClass: string) {
    const container = document.getElementById(containerId)!; // Locate the container element where new items are added
    const item = document.createElement('div'); // Create a new div to hold the input fields
    item.className = itemClass; // Assign the appropriate class to the div (education-item, work-experience-item, or skill-item)

    // Depending on the type of form being added, the content inside the div will change.
    switch (itemClass) {
        case 'education-item':
            // HTML structure for adding new education input fields
            item.innerHTML = `
                

                <input type="text" placeholder="Institution" class="education-institution">
                <input type="text" placeholder="Degree" class="education-degree">
                <input type="text" placeholder="Start Date" class="education-start-date">
                <input type="text" placeholder="End Date" class="education-end-date">
            `;
            break;
        case 'work-experience-item':
            // HTML structure for adding work experience input fields
            item.innerHTML = `
                <input type="text" placeholder="Company" class="work-company">
                <input type="text" placeholder="Position" class="work-position">
                <input type="text" placeholder="Start Date" class="work-start-date">
                <input type="text" placeholder="End Date" class="work-end-date">
                <textarea placeholder="Description" class="work-description" wrap="soft" ></textarea>
            `;
            break;
        case 'skill-item':
            // HTML structure for adding new skill input fields
            item.innerHTML = `
                <input type="text" placeholder="Skill Name" class="skill-name">
                <input type="text" placeholder="Skill Level" class="skill-level">
            `;
            break;
    }

    // Add the newly created form section to the container (education-list, work-experience-list, or skills-list)
    container.appendChild(item);
}


// function to check the contact info filling validation
function checkValidation():boolean{
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const address = (document.getElementById('address') as HTMLInputElement).value.trim();


    const combine=[name ,email, phone, address];
    const result = combine.filter((combine)=>combine.length > 0).length

    return result ==4;
    
}
// checks if the email ends with @gmail.com
function emailvalidation(){
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    if (email.slice(-10) !== '@gmail.com') {
        alert ("please write correct email")
        return false;
    }
    return true;
}


// Generates the resume from the inputted data and updates the UI accordingly.
function generateResume() {

    //checks if user has filled the contact info
    if (!checkValidation()) {
        alert("please fill the contact information first");
        return;
    }

    if (!emailvalidation()) {
        return; // Stops the function if email is not valid
    }



    // Grabs the contact info from the input fields.
    const contactInfo = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        phone: (document.getElementById('phone') as HTMLInputElement).value,
        address: (document.getElementById('address') as HTMLInputElement).value,
    };

 



    
    // Clears the education list array before adding new data to avoid duplicates.
    educationList.length = 0;
    // Loops through all added education items and collects the values from input fields.
    document.querySelectorAll('.education-item').forEach(item => {
        const edu: Education = {
            institution: (item.querySelector('.education-institution') as HTMLInputElement).value,
            degree: (item.querySelector('.education-degree') as HTMLInputElement).value,
            startDate: (item.querySelector('.education-start-date') as HTMLInputElement).value,
            endDate: (item.querySelector('.education-end-date') as HTMLInputElement).value,
        };
        // Pushes each education entry into the educationList array.
        educationList.push(edu);
    });



    // Same process as above but for work experience data.
    workExperienceList.length = 0;
    document.querySelectorAll('.work-experience-item').forEach(item => {
        const exp: WorkExperience = {
            company: (item.querySelector('.work-company') as HTMLInputElement).value,
            position: (item.querySelector('.work-position') as HTMLInputElement).value,
            startDate: (item.querySelector('.work-start-date') as HTMLInputElement).value,
            endDate: (item.querySelector('.work-end-date') as HTMLInputElement).value,
            description: (item.querySelector('.work-description') as HTMLTextAreaElement).value,
        };
        // Pushes each work experience entry into the workExperienceList array.
        workExperienceList.push(exp);
    });



    // Same process for skills data.
    skillsList.length = 0;
    document.querySelectorAll('.skill-item').forEach(item => {
        const skill: Skill = {
            name: (item.querySelector('.skill-name') as HTMLInputElement).value,
            level: (item.querySelector('.skill-level') as HTMLInputElement).value,
        };
        // Pushes each skill entry into the skillsList array.
        skillsList.push(skill);
    });





    // Select the resume output container in the DOM where the resume will be displayed.
    const resumeOutput = document.getElementById('resume-output')!;
    
    // Generate the HTML structure for the resume and inject it into the container.
    resumeOutput.innerHTML = `
        <h2>Resume</h2>
        <h3>Contact Information</h3>
        <p>Name: ${contactInfo.name}</p>
        <p>Email: ${contactInfo.email}</p>
        <p>Phone: ${contactInfo.phone}</p>
        <p>Address: ${contactInfo.address}</p>

      <h3>Education</h3>
        ${educationList.map(edu => `
    <p>${edu.institution}${edu.degree ? ` - ${edu.degree}` : ''} (${edu.startDate}${edu.endDate ? ` to ${edu.endDate}` : ''})</p>
        `).join('')}<!-- Loops through the educationList and displays each entry -->

        <h3>Work Experience</h3>
        ${workExperienceList.map(exp => `
        <p>${exp.company}${exp.position ? ` - ${exp.position}` : ''} (${exp.startDate}${exp.endDate ? ` to ${exp.endDate}` : ''})</p>
        <p>${exp.description}</p>
        `).join('')}<!-- Loops through the Work Experience and displays each entry -->

        <h3>Skills</h3>
        ${skillsList.map(skill => `
        <p>${skill.name}: ${skill.level}</p>
        `).join('')}<!-- Loops through the Skills and displays each entry -->

    `;
}