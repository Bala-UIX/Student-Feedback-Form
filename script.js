// DOM elements
const studentTopicsContainer = document.getElementById('studentTopicsContainer');
const feedbackForm = document.getElementById('feedbackForm');
const successMessage = document.getElementById('successMessage');
const downloadLink = document.getElementById('downloadLink');
const loadingIndicator = document.getElementById('loadingTopics');
const errorDiv = document.getElementById('topicsError');
const topicsCount = document.getElementById('topicsCount');
const pdfTemplate = document.getElementById('pdfTemplate');
const pdfStudentName = document.getElementById('pdfStudentName');
const pdfStudentPhone = document.getElementById('pdfStudentPhone');

// JSON data embedded directly to avoid CORS issues
const topicsData = {
    "topics": [
        "Graphic Design Fundamentals - Difference Between 2D & 3D",
        "Visual Design Elements & Principles",
        "Photoshop - Creating Adobe Account",
        "Various Types of Account",
        "Benefits of Adobe Account",
        "Familiar With Workspace",
        "Creating New Project",
        "Getting Familiar With Navigations",
        "Understanding Tools",
        "Intro to Layers",
        "Working With Layers",
        "Layer Styles - Blending Modes",
        "Adding Text",
        "Colors - RGB & CYMK",
        "Colors - Adding, Changing, Enhancing, Gradient",
        "Adjust Image Size Without Distortion",
        "Fixing Blurry Images",
        "Color & Tone Correction of Images",
        "Changing an Image to Black & White",
        "Image Enhancement Techniques",
        "Working With Various Shapes",
        "Filters For Image Editing",
        "Retouching - Patch, Spot Healing, Healing, Clone Stamp",
        "Remove Unwanted Things From Background",
        "Working With Shadows",
        "Adjustment Layer",
        "Saving & Exporting Images",
        "Intro to UX Design - Fundamentals of UI & UX Design, Good & Poor Design, Difference Between UI & UX Design, Evolution & Importance of UI/UX, Elements of Good UI/UX Design, Job Roles",
        "UX Design Principles - Usability Heuristics & Guidelines, Design Consistency, Heuristic Principle, Gestalt Principle, Cognitive Bias",
        "User Experience Design Frameworks - Design Frameworks, Types of Frameworks, Double Diamond Overview, Lean UX Overview",
        "Agile Methodology - Sprint, Owners, Scrum, Solving Problem, Learning Loop, Iterations, Retrospections, Design Thinking - Linear & Non Linear Process",
        "Researching Project - Understanding Empathy, Methods & Techniques for Empathy, Conducting User Research, Field Study, User Interview, User Survey, Stakeholder Interview, 5 Why Concept, Focus Group, Holistic View",
        "Analysing Project - Analysing Research Data, Understanding User Persona, Competitor Analysis",
        "Defining Project - Affinity Mapping, User Personas, Experience Maps, Brainstroming Ideas",
        "User Flows & Information Architecture - Card Shorting, Understaing Usere Flow, Task Flow, Difference Between User & Task Flow, Ideating, Observing & Analyzing, Heuristic Evaluation, Creating Information Architecture",
        "Usability Testing & Evaluation - Pain Points, Gather Feedback, Validate Design Decisions, A/B Testing",
        "Wireframing & Low Fidelity - Prototyping Concepts & Tools, Low Fidelity vs High Fidelity Prototypes, Interactive Wireframes & Mockups, Using Prototypes For User Testing & Feedback",
        "Figma - Getting Started",
        "Workspace, Navigation, Tools",
        "Vector Shapes & Pen Tools",
        "Components, Constraints, Auto Layout",
        "Type & Fonts, Rectangle Circle Rounded Corner Buttons",
        "Using Colors, Stroke, Object Editing, Scale",
        "Frames & Groups",
        "Free Icons - Plugins",
        "High Fidelity Wireframe",
        "Understading Material Design",
        "Design Across Various Platforms",
        "Create First Website",
        "Create First Mobile App",
        "Create Complete App From Wireframe LF to HF",
        "Figma Mirror",
        "Prototype - Web & Mobile Prototyping",
        "How to Prototype",
        "Prototype Animation & Easing",
        "Testing on Your Phone With Figma Mirror",
        "Portfolio - Creating Account in Behance, Dribbble, Medium",
        "Creating Portfolio",
        "Case Study Structure & Compilation",
        "Publishing Case Study"
    ]
};

// Load topics when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTopicsFromData();
});

// Load topics from embedded data
function loadTopicsFromData() {
    loadingIndicator.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    
    try {
        const topics = topicsData.topics;
        
        if (topics.length === 0) {
            throw new Error('No topics found in the data.');
        }
        
        initializeStudentTopics(topics);
        topicsCount.textContent = topics.length;
    } catch (error) {
        console.error('Error loading topics:', error);
        showError(`Error: ${error.message}. Using sample topics instead.`);
        
        // Fallback to sample topics
        const sampleTopics = [
            "Introduction to Programming",
            "Data Structures",
            "Algorithms",
            "Web Development",
            "Database Management",
            "Object-Oriented Programming",
            "Software Engineering Principles",
            "Version Control with Git",
            "User Interface Design",
            "User Experience Principles",
            "Responsive Web Design",
            "Frontend Frameworks",
            "Backend Development",
            "API Design",
            "Testing Methodologies",
            "Deployment Strategies"
        ];
        
        initializeStudentTopics(sampleTopics);
        topicsCount.textContent = `${sampleTopics.length} sample topics loaded`;
    } finally {
        loadingIndicator.classList.add('hidden');
    }
}

// Initialize the student topics
function initializeStudentTopics(topics) {
    studentTopicsContainer.innerHTML = '';
    
    if (topics.length === 0) {
        studentTopicsContainer.innerHTML = '<p>No topics found.</p>';
        return;
    }
    
    topics.forEach(topic => {
        const topicItem = document.createElement('div');
        topicItem.className = 'topic-item';
        topicItem.dataset.topic = topic;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = false;
        checkbox.name = 'topic';
        checkbox.value = topic;
        checkbox.id = `topic-${topic.replace(/\s+/g, '-')}`;
        
        const topicName = document.createElement('span');
        topicName.className = 'topic-name';
        topicName.textContent = topic;
        
        topicItem.appendChild(checkbox);
        topicItem.appendChild(topicName);
        
        // Make the entire topic item clickable
        topicItem.addEventListener('click', function(e) {
            // Don't toggle if the click was directly on the checkbox
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
                updateTopicItemStyle(topicItem, checkbox.checked);
            }
        });
        
        studentTopicsContainer.appendChild(topicItem);
    });
}

// Update topic item style based on checked status
function updateTopicItemStyle(topicItem, isChecked) {
    if (isChecked) {
        topicItem.classList.add('covered');
    } else {
        topicItem.classList.remove('covered');
    }
}

// Show error message
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Handle form submission
feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const studentName = document.getElementById('studentName').value;
    const studentPhone = document.getElementById('studentPhone').value;
    const feedback = document.getElementById('feedback').value;
    
    // Get topics data
    const topicCheckboxes = document.querySelectorAll('#studentTopicsContainer input[type="checkbox"]');
    
    if (topicCheckboxes.length === 0) {
        showError('No topics available. Please refresh the page to load topics.');
        return;
    }
    
    const topicsData = [];
    
    topicCheckboxes.forEach(checkbox => {
        topicsData.push({
            name: checkbox.value,
            covered: checkbox.checked
        });
    });
    
    // Generate PDF
    generatePDF(studentName, studentPhone, topicsData, feedback);
    
    // Show success message
    feedbackForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
});

// Generate PDF using html2canvas and jsPDF with proper pagination
function generatePDF(studentName, studentPhone, topics, feedback) {
    // Set student name and phone in PDF template
    pdfStudentName.textContent = `Student Name: ${studentName}`;
    pdfStudentPhone.textContent = studentPhone ? `Phone: ${studentPhone}` : '';
    
    // Calculate percentage
    const totalTopics = topics.length;
    const coveredTopics = topics.filter(topic => topic.covered).length;
    const nonCoveredTopics = totalTopics - coveredTopics;
    const percentage = totalTopics > 0 ? Math.round((coveredTopics / totalTopics) * 100) : 0;
    const nonCoveredPercentage = 100 - percentage;
    
    // Create separate containers for each section
    const coveredContainer = document.createElement('div');
    coveredContainer.className = 'pdf-main-container';
    
    // Add covered topics section
    const coveredSection = document.createElement('div');
    coveredSection.className = 'form-section';
    coveredSection.innerHTML = `<h3>Covered Topics - ${coveredTopics} (${percentage}%)</h3>`;
    coveredContainer.appendChild(coveredSection);
    
    const coveredTopicsList = document.createElement('div');
    coveredTopicsList.className = 'topics-list';
    
    topics.forEach(topic => {
        if (topic.covered) {
            const topicItem = document.createElement('div');
            topicItem.className = 'topic-item';
            
            const statusIcon = document.createElement('span');
            statusIcon.textContent = '✓ ';
            statusIcon.style.color = '#2ecc71';
            statusIcon.style.marginRight = '10px';
            statusIcon.style.fontSize = '16px';
            
            const topicName = document.createElement('span');
            topicName.className = 'topic-name';
            topicName.textContent = topic.name;
            
            topicItem.appendChild(statusIcon);
            topicItem.appendChild(topicName);
            
            coveredTopicsList.appendChild(topicItem);
        }
    });
    
    coveredContainer.appendChild(coveredTopicsList);
    
    // Create non-covered container
    const nonCoveredContainer = document.createElement('div');
    nonCoveredContainer.className = 'pdf-main-container';
    
    // Add non-covered topics section
    const nonCoveredSection = document.createElement('div');
    nonCoveredSection.className = 'form-section';
    nonCoveredSection.innerHTML = `<h3>Non-Covered Topics - ${nonCoveredTopics} (${nonCoveredPercentage}%)</h3>`;
    nonCoveredContainer.appendChild(nonCoveredSection);
    
    const nonCoveredTopicsList = document.createElement('div');
    nonCoveredTopicsList.className = 'topics-list';
    
    topics.forEach(topic => {
        if (!topic.covered) {
            const topicItem = document.createElement('div');
            topicItem.className = 'topic-item';
            
            const statusIcon = document.createElement('span');
            statusIcon.textContent = '✗ ';
            statusIcon.style.color = '#e74c3c';
            statusIcon.style.marginRight = '10px';
            statusIcon.style.fontSize = '16px';
            
            const topicName = document.createElement('span');
            topicName.className = 'topic-name';
            topicName.textContent = topic.name;
            
            topicItem.appendChild(statusIcon);
            topicItem.appendChild(topicName);
            
            nonCoveredTopicsList.appendChild(topicItem);
        }
    });
    
    nonCoveredContainer.appendChild(nonCoveredTopicsList);
    
    // Create feedback container
    let feedbackContainer = null;
    if (feedback) {
        feedbackContainer = document.createElement('div');
        feedbackContainer.className = 'pdf-main-container';
        
        // Add feedback section
        const feedbackSection = document.createElement('div');
        feedbackSection.className = 'form-section';
        feedbackSection.innerHTML = `
            <h3>Student Feedback</h3>
            <div class="feedback-content">${feedback}</div>
        `;
        feedbackContainer.appendChild(feedbackSection);
    }
    
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Function to add a page from a container
    function addPageFromContainer(container, isFirstPage = false) {
        return new Promise((resolve) => {
            // Clear the PDF template and add the current container
            const pdfTopicsContainer = document.getElementById('pdf-topicsContainer');
            pdfTopicsContainer.innerHTML = '';
            pdfTopicsContainer.appendChild(container);
            
            // Use html2canvas to capture the PDF template
            html2canvas(pdfTemplate, {
                scale: 1,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                height: pdfTemplate.scrollHeight,
                windowHeight: pdfTemplate.scrollHeight
            }).then(canvas => {
                // Convert canvas to image data
                const imgData = canvas.toDataURL('image/png');
                
                // Calculate PDF dimensions
                const imgWidth = 210; // A4 width in mm
                const pageHeight = 297; // A4 height in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                
                // Calculate how many pages we need for this content
                let heightLeft = imgHeight;
                let position = 0;
                
                // Add the first page
                if (isFirstPage) {
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                } else {
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                
                // Add additional pages if content is too long
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                
                resolve();
            });
        });
    }
    
    // Add pages in sequence
    const promises = [];
    
    // Add covered topics as the first page
    promises.push(addPageFromContainer(coveredContainer, true));
    
    // Add non-covered topics as the next page
    if (nonCoveredTopics > 0) {
        promises.push(addPageFromContainer(nonCoveredContainer, false));
    }
    
    // Add feedback as the next page if it exists
    if (feedbackContainer) {
        promises.push(addPageFromContainer(feedbackContainer, false));
    }
    
    // Execute all promises sequentially
    Promise.all(promises)
        .then(() => {
            // Add footer to all pages with right alignment
            const totalPages = doc.internal.getNumberOfPages();
            const pageWidth = doc.internal.pageSize.getWidth();
            
            for (let i = 1; i <= totalPages; i++) {
                doc.setPage(i);
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text(`Page ${i} of ${totalPages}`, 
                         pageWidth - 30,
                         doc.internal.pageSize.getHeight() - 10);
            }
            
            // Generate PDF and create download link
            const pdfBlob = doc.output('blob');
            const url = URL.createObjectURL(pdfBlob);
            downloadLink.href = url;

             // Generate filename with student name and phone number
        let fileName = `${studentName.replace(/\s+/g, '_')}`;
        if (studentPhone) {
            fileName += `_${studentPhone.replace(/\s+/g, '')}`;
        }
        fileName += '_Feedback_Report.pdf';
        
        downloadLink.download = fileName;
    });
}
