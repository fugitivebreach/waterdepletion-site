// Global variables
let config = null;
let cursorAnimation = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeCursor();
    startLoadingSequence();
});

// Custom cursor functionality
function initializeCursor() {
    const cursorElement = document.getElementById('cursor-animation');
    
    document.addEventListener('mousemove', function(e) {
        cursorElement.style.left = e.clientX + 'px';
        cursorElement.style.top = e.clientY + 'px';
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', function() {
        cursorElement.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursorElement.style.opacity = '1';
    });
}

// Loading sequence with Illinois water depletion facts
async function startLoadingSequence() {
    const illinoisFacts = [
        "Illinois uses over 13 billion gallons of water daily from Lake Michigan and groundwater sources.",
        "The Chicago River was reversed in 1900 to prevent water contamination, a major engineering feat.",
        "Illinois has over 87,000 miles of rivers and streams, but many face pollution challenges.",
        "Agricultural irrigation in Illinois consumes about 40% of the state's freshwater resources.",
        "Lake Michigan provides drinking water to over 7 million Illinois residents.",
        "Illinois groundwater levels have dropped significantly due to over-pumping in agricultural areas.",
        "The Illinois River has lost 90% of its original wetlands, affecting water quality and wildlife.",
        "Climate change is causing more frequent droughts and floods in Illinois, stressing water systems."
    ];

    const factText = document.getElementById('fact-text');
    let currentFactIndex = 0;

    // Function to cycle through facts
    function showNextFact() {
        factText.textContent = illinoisFacts[currentFactIndex];
        currentFactIndex = (currentFactIndex + 1) % illinoisFacts.length;
    }

    // Show first fact immediately
    showNextFact();

    // Change facts every 3 seconds
    const factInterval = setInterval(showNextFact, 3000);

    // Load for 9 seconds (3 facts)
    await new Promise(resolve => setTimeout(resolve, 9000));

    // Clear the interval
    clearInterval(factInterval);

    // Load actual config and start app
    await loadConfig();
    
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    loadingScreen.classList.add('hidden');
    mainContent.classList.add('visible');
}

// Load configuration from config.json
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        config = await response.json();
        renderPage();
    } catch (error) {
        console.error('Error loading config:', error);
        showError('Failed to load configuration. Please check if config.json exists and is valid.');
    }
}

// Render the entire page based on config
function renderPage() {
    if (!config) return;
    
    // Set topic title and description
    document.getElementById('topic-title').textContent = config.TopicTitle;
    document.getElementById('topic-description').textContent = config.TopicDescription;
    
    // Render grid parts
    renderGridParts();
    
    // Render citations
    renderCitations();
}

// Render grid parts
function renderGridParts() {
    const gridContainer = document.getElementById('grid-container');
    const gridParts = config.GridParts || [];
    
    // Clear existing content
    gridContainer.innerHTML = '';
    
    // Add single-item class if only one item
    if (gridParts.length === 1) {
        gridContainer.classList.add('single-item');
    } else {
        gridContainer.classList.remove('single-item');
    }
    
    // Create grid parts
    gridParts.forEach((part, index) => {
        const gridPartElement = createGridPart(part, index);
        gridContainer.appendChild(gridPartElement);
    });
}

// Create individual grid part element
function createGridPart(part, index) {
    const gridPart = document.createElement('div');
    gridPart.className = 'grid-part';
    gridPart.style.animationDelay = `${index * 0.2}s`;
    
    // Create title
    const title = document.createElement('h3');
    title.className = 'grid-part-title';
    title.textContent = part.GridPartTitle;
    
    // Apply LED text or custom color
    if (part.LedText) {
        title.classList.add('led-text');
        // Set up dynamic LED colors if available
        if (config.ledTextColors && config.ledTextColors.length > 0) {
            setupDynamicLedColors(title, config.ledTextColors);
        }
    } else if (part.TextColor) {
        title.style.color = part.TextColor;
    } else {
        title.style.color = '#ffffff';
    }
    
    // Create description
    const description = document.createElement('p');
    description.className = 'grid-part-description';
    description.textContent = part.GridPartDescription;
    
    // Create bulletin points
    const bulletinContainer = document.createElement('div');
    bulletinContainer.className = 'grid-part-bulletin';
    
    if (part.GridPartBulletin && part.GridPartBulletin.length > 0) {
        const bulletinList = document.createElement('ul');
        
        part.GridPartBulletin.forEach(bulletPoint => {
            if (bulletPoint !== null && bulletPoint !== undefined && bulletPoint !== '') {
                const listItem = document.createElement('li');
                listItem.textContent = bulletPoint;
                bulletinList.appendChild(listItem);
            }
        });
        
        bulletinContainer.appendChild(bulletinList);
    }
    
    // Create image if provided
    let imageElement = null;
    if (part.GridPartImageLink) {
        imageElement = document.createElement('img');
        imageElement.className = 'grid-part-image';
        imageElement.src = part.GridPartImageLink;
        imageElement.alt = part.GridPartTitle;
        imageElement.loading = 'lazy';
        
        // Handle image load errors
        imageElement.onerror = function() {
            this.style.display = 'none';
        };
    }
    
    // Assemble the grid part
    gridPart.appendChild(title);
    gridPart.appendChild(description);
    gridPart.appendChild(bulletinContainer);
    
    if (imageElement) {
        gridPart.appendChild(imageElement);
    }
    
    return gridPart;
}

// Setup dynamic LED colors
function setupDynamicLedColors(element, colors) {
    if (!colors || colors.length === 0) return;
    
    let colorIndex = 0;
    const duration = 4000; // 4 seconds total cycle
    const intervalTime = duration / colors.length;
    
    function updateColor() {
        const color = colors[colorIndex];
        element.style.color = color;
        element.style.textShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        colorIndex = (colorIndex + 1) % colors.length;
    }
    
    // Set initial color
    updateColor();
    
    // Start the color cycling
    setInterval(updateColor, intervalTime);
}

// Show error message
function showError(message) {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = `
        <div class="error-message" style="
            color: #ff6b6b;
            text-align: center;
            padding: 2rem;
            background: rgba(255, 107, 107, 0.1);
            border-radius: 10px;
            border: 1px solid rgba(255, 107, 107, 0.3);
        ">
            <h3>Error</h3>
            <p>${message}</p>
        </div>
    `;
}

// Add smooth scrolling behavior
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior to any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe grid parts when they're created
function observeGridParts() {
    document.querySelectorAll('.grid-part').forEach(part => {
        part.style.opacity = '0';
        part.style.transform = 'translateY(20px)';
        part.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(part);
    });
}

// Render citations section
function renderCitations() {
    const citationsList = document.getElementById('citations-list');
    const citations = config.Citations || [];
    
    // Clear existing content
    citationsList.innerHTML = '';
    
    // Hide citations section if no citations
    const citationsSection = document.getElementById('citations-section');
    if (citations.length === 0) {
        citationsSection.style.display = 'none';
        return;
    } else {
        citationsSection.style.display = 'block';
    }
    
    // Create citation items
    citations.forEach((citation, index) => {
        if (citation && citation.trim() !== '') {
            const citationElement = document.createElement('div');
            citationElement.className = 'citation-item';
            citationElement.textContent = citation;
            citationElement.style.animationDelay = `${index * 0.1}s`;
            citationsList.appendChild(citationElement);
        }
    });
}

// Call observe function after grid parts are rendered
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the grid parts to be rendered
    setTimeout(observeGridParts, 500);
});
