/**
 * Hills Cab - Product Details JavaScript
 * A German Innovation in Wires and Cables
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get product type from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productType = urlParams.get('type');
    
    if (productType) {
        loadProductDetails(productType);
    } else {
        // Default to earthx if no product type specified
        loadProductDetails('earthx');
    }
    
    // Set current product in inquiry form
    const inquiryProductField = document.getElementById('inquiryProduct');
    if (inquiryProductField) {
        inquiryProductField.value = productType || 'earthx';
    }
});

/**
 * Load Product Details based on product type
 * @param {string} productType - The type of product to load
 */
function loadProductDetails(productType) {
    // Get product data
    const productData = getProductData(productType);
    
    // Update page title and breadcrumb
    document.title = `${productData.name} - Hills Cab`;
    
    const productTitle = document.getElementById('product-title');
    const productBreadcrumb = document.getElementById('product-breadcrumb');
    
    if (productTitle) {
        productTitle.textContent = productData.name;
    }
    
    if (productBreadcrumb) {
        productBreadcrumb.textContent = productData.name;
    }
    
    // Update product image
    const mainProductImage = document.getElementById('main-product-image');
    if (mainProductImage) {
        mainProductImage.innerHTML = productData.svg;
        mainProductImage.style.backgroundColor = productData.color;
    }
    
    // Update product info
    const productName = document.getElementById('product-name');
    const productTagline = document.getElementById('product-tagline');
    const productDescription = document.getElementById('product-description');
    
    if (productName) {
        productName.textContent = productData.name;
    }
    
    if (productTagline) {
        productTagline.textContent = productData.tagline;
    }
    
    if (productDescription) {
        productDescription.innerHTML = productData.description;
    }
    
    // Update features list
    const featuresList = document.getElementById('features-list');
    if (featuresList) {
        featuresList.innerHTML = '';
        
        productData.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
    }
    
    // Update applications list
    const applicationsList = document.getElementById('applications-list');
    if (applicationsList) {
        applicationsList.innerHTML = '';
        
        productData.applications.forEach(application => {
            const li = document.createElement('li');
            li.textContent = application;
            applicationsList.appendChild(li);
        });
    }
    
    // Update specifications table
    const specsTable = document.getElementById('specs-table');
    if (specsTable) {
        const tbody = specsTable.querySelector('tbody');
        tbody.innerHTML = '';
        
        Object.entries(productData.specifications).forEach(([key, value]) => {
            const tr = document.createElement('tr');
            
            const th = document.createElement('th');
            th.textContent = key;
            
            const td = document.createElement('td');
            td.textContent = value;
            
            tr.appendChild(th);
            tr.appendChild(td);
            tbody.appendChild(tr);
        });
    }
    
    // Update advantages grid
    const advantagesGrid = document.getElementById('advantages-grid');
    if (advantagesGrid) {
        advantagesGrid.innerHTML = '';
        
        productData.advantages.forEach(advantage => {
            const div = document.createElement('div');
            div.className = 'feature-card';
            
            const iconDiv = document.createElement('div');
            iconDiv.className = 'feature-icon';
            const icon = document.createElement('i');
            icon.className = advantage.icon;
            iconDiv.appendChild(icon);
            
            const title = document.createElement('h3');
            title.className = 'feature-title';
            title.textContent = advantage.title;
            
            const description = document.createElement('p');
            description.className = 'feature-description';
            description.textContent = advantage.description;
            
            div.appendChild(iconDiv);
            div.appendChild(title);
            div.appendChild(description);
            
            advantagesGrid.appendChild(div);
        });
    }
    
    // Update related products
    const relatedProducts = document.getElementById('related-products');
    if (relatedProducts) {
        relatedProducts.innerHTML = '';
        
        // Get related products (all except current one)
        const allProductTypes = ['earthx', 'uni', 'submersible', 'zero', 'thermo', 'turbo', 'firex'];
        const filteredProductTypes = allProductTypes.filter(type => type !== productType);
        
        // Display only 4 related products
        const relatedProductTypes = filteredProductTypes.slice(0, 4);
        
        relatedProductTypes.forEach(type => {
            const relatedProductData = getProductData(type);
            
            const div = document.createElement('div');
            div.className = 'related-product-card';
            
            const imageDiv = document.createElement('div');
            imageDiv.className = 'related-product-image';
            imageDiv.style.backgroundColor = relatedProductData.color;
            
            const svgContainer = document.createElement('div');
            svgContainer.innerHTML = relatedProductData.smallSvg;
            imageDiv.appendChild(svgContainer);
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'related-product-content';
            
            const title = document.createElement('h3');
            title.className = 'related-product-title';
            title.textContent = relatedProductData.name;
            
            const link = document.createElement('a');
            link.className = 'related-product-link';
            link.href = `product-details.html?type=${type}`;
            link.textContent = 'View Details';
            
            contentDiv.appendChild(title);
            contentDiv.appendChild(link);
            
            div.appendChild(imageDiv);
            div.appendChild(contentDiv);
            
            relatedProducts.appendChild(div);
        });
    }
}

/**
 * Get Product Data based on product type
 * @param {string} productType - The type of product
 * @returns {Object} - Product data object
 */
function getProductData(productType) {
    const products = {
        earthx: {
            name: "EARTH Underground",
            tagline: "UG Armoured Cable with XLPE insulated LT cross linked polyethylene",
            color: "#dd2c00",
            description: `
                <p>Hills Cab EARTH Underground is a premium UG Armoured Cable designed for underground electrical installations. 
                It combines XLPE insulation with LT cross linked polyethylene to provide superior protection and durability in harsh environments.</p>
                
                <p>This cable is specifically engineered to withstand moisture, mechanical stress, and other challenging underground conditions while 
                maintaining excellent electrical properties.</p>
            `,
            features: [
                "Power Saving Technology",
                "Safe & Reliable Cable Construction",
                "Superior Wet Electrical Properties",
                "Excellent Weather Resistance",
                "Tough & Flexible Cable Design",
                "LT Cross Linked Polyethylene Insulation",
                "Excellent Moisture Abrasion Resistance"
            ],
            applications: [
                "Underground Power Distribution",
                "Industrial Power Supply Lines",
                "Outdoor Electrical Installations",
                "Street Lighting Systems",
                "Commercial Building Infrastructure",
                "Heavy-duty Industrial Applications"
            ],
            specifications: {
                "Conductor": "Annealed Copper",
                "Insulation": "XLPE (Cross-Linked Polyethylene)",
                "Sheath": "PVC (Black)",
                "Armour": "Galvanized Steel Wire/Flat Strip",
                "Voltage Rating": "1.1 kV",
                "Temperature Range": "-20°C to +90°C",
                "Standard": "IS 7098 (Part 1)",
                "Available Sizes": "1.5 sq mm to 400 sq mm",
                "Core Options": "Single Core, Two Core, Three Core, Four Core",
                "Special Feature": "Excellent Moisture Resistance"
            },
            advantages: [
                {
                    icon: "fas fa-tint-slash",
                    title: "Moisture Resistant",
                    description: "Superior protection against water and moisture, ensuring reliable performance in wet environments."
                },
                {
                    icon: "fas fa-bolt",
                    title: "Power Efficiency",
                    description: "Low power loss due to high-quality insulation, leading to energy savings in long-term operation."
                },
                {
                    icon: "fas fa-shield-alt",
                    title: "Mechanical Protection",
                    description: "Robust armoured design provides excellent protection against physical damage and external stress."
                }
            ],
            svg: `
                <svg width="400" height="300" viewBox="0 0 400 300">
                    <circle cx="200" cy="150" r="120" fill="#c41c00"/>
                    <circle cx="200" cy="150" r="100" fill="#dd2c00"/>
                    <text x="200" y="130" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="32" font-weight="bold">EARTH<tspan font-size="22" baseline-shift="super">X</tspan></text>
                    <text x="200" y="170" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="20">UNDERGROUND</text>
                    <path d="M120,200 C150,220 250,220 280,200" stroke="#ffffff" stroke-width="4" fill="none"/>
                    
                    <!-- Cable illustration -->
                    <g transform="translate(110, 220)">
                        <rect x="0" y="0" width="180" height="20" fill="#222" rx="5" ry="5"/>
                        <rect x="5" y="5" width="170" height="10" fill="#333" rx="3" ry="3"/>
                        <circle cx="40" cy="10" r="3" fill="#dd2c00"/>
                        <circle cx="90" cy="10" r="3" fill="#dd2c00"/>
                        <circle cx="140" cy="10" r="3" fill="#dd2c00"/>
                    </g>
                </svg>
            `,
            smallSvg: `
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="#c41c00"/>
                    <circle cx="60" cy="60" r="40" fill="#dd2c00"/>
                    <text x="60" y="55" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="14" font-weight="bold">EARTH<tspan font-size="10" baseline-shift="super">X</tspan></text>
                    <text x="60" y="75" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="8">UNDERGROUND</text>
                </svg>
            `
        },
        uni: {
            name: "UNI",
            tagline: "Double 2x Layer Twisted Cables for Power Saving",
            color: "#0d47a1",
            description: `
                <p>Hills Cab UNI is a premium double layer twisted cable designed for optimal power saving and safety. 
                It features an innovative double layered construction that provides enhanced protection and efficiency.</p>
                
                <p>With its focus on power saving technology and home safety, UNI cables are the perfect choice for 
                modern residential installations where reliability and efficiency are paramount.</p>
            `,
            features: [
                "Double 2x Layer Twisted Cable Design",
                "Power Saving Technology",
                "Fire Save Protection",
                "Home Safety and Security",
                "Premium Quality Copper Conductor",
                "Enhanced Insulation Properties",
                "Long Service Life"
            ],
            applications: [
                "Residential Wiring",
                "Apartment Buildings",
                "Home Appliance Connections",
                "Light Commercial Installations",
                "Indoor Electrical Systems",
                "General Purpose Wiring"
            ],
            specifications: {
                "Conductor": "High Conductivity Annealed Copper",
                "Insulation": "Double Layer Specialized PVC",
                "Voltage Rating": "750V",
                "Temperature Range": "-15°C to +85°C",
                "Standard": "IS 694",
                "Available Sizes": "1.0 sq mm to 6.0 sq mm",
                "Core Options": "Single Core",
                "Special Feature": "Double Layer Twisted Construction",
                "Color Options": "Red, Black, Blue, Yellow, Green",
                "Testing Voltage": "3000V"
            },
            advantages: [
                {
                    icon: "fas fa-bolt",
                    title: "Energy Efficient",
                    description: "Specialized construction reduces power loss and improves energy efficiency in electrical circuits."
                },
                {
                    icon: "fas fa-layer-group",
                    title: "Double Layer Protection",
                    description: "Two layers of high-quality insulation provide extra protection against electrical faults."
                },
                {
                    icon: "fas fa-home",
                    title: "Home Safety",
                    description: "Designed specifically to enhance safety in residential applications, reducing risk of electrical hazards."
                }
            ],
            svg: `
                <svg width="400" height="300" viewBox="0 0 400 300">
                    <rect x="50" y="50" width="300" height="200" fill="#0a3d8f"/>
                    <rect x="70" y="70" width="260" height="160" fill="#0d47a1"/>
                    <text x="200" y="140" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="48" font-weight="bold">UNI</text>
                    <text x="200" y="180" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="16">CARE FOR POWER SAVING</text>
                    
                    <!-- Cable illustration -->
                    <g transform="translate(130, 220)">
                        <path d="M0,0 C40,-10 80,10 120,0" stroke="#0d47a1" stroke-width="12" fill="none" stroke-linecap="round"/>
                        <path d="M0,0 C40,-10 80,10 120,0" stroke="#1565c0" stroke-width="8" fill="none" stroke-linecap="round"/>
                    </g>
                </svg>
            `,
            smallSvg: `
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <rect x="10" y="10" width="100" height="100" fill="#0a3d8f"/>
                    <rect x="20" y="20" width="80" height="80" fill="#0d47a1"/>
                    <text x="60" y="60" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="22" font-weight="bold">UNI</text>
                    <text x="60" y="80" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="6">CARE FOR POWER SAVING</text>
                </svg>
            `
        },
        submersible: {
            name: "Submersible Cable",
            tagline: "World's Best Flexible Cables with Mechanical Protection",
            color: "#388e3c",
            description: `
                <p>Hills Cab Submersible Cable is specially designed for underwater applications, particularly for submersible pumps. 
                It features a 3 Core Flat XLPE & PVC insulated construction that provides excellent mechanical protection and flexibility.</p>
                
                <p>With its water-resistant properties and mechanical durability, this cable ensures safe and reliable operation in 
                submerged conditions and wet environments.</p>
            `,
            features: [
                "3 Core Flat Design",
                "XLPE Insulated & PVC Sheathed",
                "Superior Mechanical Protection",
                "Excellent Flexibility",
                "Water-resistant Construction",
                "Enhanced Durability",
                "Safe Operation in Submerged Conditions"
            ],
            applications: [
                "Submersible Pumps",
                "Deep Well Installations",
                "Agricultural Irrigation Systems",
                "Water Supply Systems",
                "Sewage Handling",
                "Underwater Lighting",
                "Fountain Installations"
            ],
            specifications: {
                "Conductor": "Multi-stranded Annealed Copper",
                "Insulation": "XLPE (Cross-Linked Polyethylene)",
                "Outer Sheath": "Heavy Duty PVC (Black)",
                "Construction": "3 Core Flat Cable",
                "Voltage Rating": "1.1 kV",
                "Temperature Range": "-20°C to +90°C",
                "Standard": "IS 694 / IS 7098",
                "Available Sizes": "1.5 sq mm to 16 sq mm",
                "Color Coding": "Red, Yellow, Blue Cores",
                "Special Feature": "Water-resistant Construction"
            },
            advantages: [
                {
                    icon: "fas fa-water",
                    title: "Water Resistant",
                    description: "Specially engineered to withstand continuous submersion in water without performance degradation."
                },
                {
                    icon: "fas fa-tools",
                    title: "Mechanical Strength",
                    description: "Robust construction provides excellent resistance to physical stress and mechanical damage."
                },
                {
                    icon: "fas fa-wind",
                    title: "Flexibility",
                    description: "Highly flexible design allows for easy installation in confined spaces and around tight bends."
                }
            ],
            svg: `
                <svg width="400" height="300" viewBox="0 0 400 300">
                    <rect x="0" y="0" width="400" height="300" fill="#2e7d32"/>
                    <circle cx="200" cy="150" r="120" fill="#1b5e20"/>
                    <text x="200" y="130" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="28" font-weight="bold">SUBMERSIBLE</text>
                    <text x="200" y="170" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="18">CABLE</text>
                    
                    <!-- Cable illustration -->
                    <g transform="translate(100, 220)">
                        <rect x="0" y="0" width="200" height="30" rx="15" ry="15" fill="#222"/>
                        <g transform="translate(20, 15)">
                            <circle cx="0" cy="0" r="10" fill="#d32f2f"/>
                            <circle cx="0" cy="0" r="7" fill="#f44336"/>
                        </g>
                        <g transform="translate(100, 15)">
                            <circle cx="0" cy="0" r="10" fill="#fbc02d"/>
                            <circle cx="0" cy="0" r="7" fill="#ffeb3b"/>
                        </g>
                        <g transform="translate(180, 15)">
                            <circle cx="0" cy="0" r="10" fill="#1565c0"/>
                            <circle cx="0" cy="0" r="7" fill="#2196f3"/>
                        </g>
                    </g>
                </svg>
            `,
            smallSvg: `
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <rect x="0" y="0" width="120" height="120" fill="#2e7d32"/>
                    <circle cx="60" cy="60" r="40" fill="#1b5e20"/>
                    <text x="60" y="55" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="10" font-weight="bold">SUBMERSIBLE</text>
                    <text x="60" y="70" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="8">CABLE</text>
                </svg>
            `
        },
        zero: {
            name: "Zero Smoke Zero Halogen",
            tagline: "India's Only Zero Smoke Zero Halogen Technology Cables",
            color: "#2e7d32",
            description: `
                <p>Hills Cab Zero Smoke Zero Halogen cables represent a breakthrough in safety technology. These specialized cables produce 
                no smoke and no halogen gas emissions in case of fire, significantly enhancing safety in enclosed spaces.</p>
                
                <p>As India's only Zero Smoke Zero Halogen technology cables, they provide unmatched protection for residential and 
                commercial installations where fire safety is a primary concern.</p>
            `,
            features: [
                "Zero Smoke Emission",
                "Zero Halogen Technology",
                "Flame Retardant Properties",
                "Enhanced Fire Safety",
                "Reduced Toxicity During Fire",
                "Home Safety and Security",
                "Environmentally Friendly"
            ],
            applications: [
                "Residential Buildings",
                "Commercial Complexes",
                "Hospitals and Healthcare Facilities",
                "Educational Institutions",
                "Public Gathering Spaces",
                "Data Centers",
                "Transportation Hubs"
            ],
            specifications: {
                "Conductor": "Annealed Copper",
                "Insulation": "Zero Halogen Compound",
                "Sheath": "Zero Halogen Flame Retardant Compound",
                "Voltage Rating": "750V",
                "Temperature Range": "-15°C to +90°C",
                "Standard": "IS 694 / IEC 60754",
                "Available Sizes": "1.0 sq mm to 10.0 sq mm",
                "Core Options": "Single Core",
                "Special Feature": "Zero Smoke, Zero Halogen Emission",
                "Fire Performance": "Minimal Flame Spread, No Toxic Gas Emission"
            },
            advantages: [
                {
                    icon: "fas fa-smog",
                    title: "Zero Smoke",
                    description: "Produces no smoke during combustion, maintaining visibility during fire evacuations."
                },
                {
                    icon: "fas fa-skull-crossbones",
                    title: "Non-Toxic",
                    description: "Contains no halogens, eliminating the risk of toxic gas emissions during fire incidents."
                },
                {
                    icon: "fas fa-fire-alt",
                    title: "Flame Retardant",
                    description: "Advanced technology prevents flame propagation, enhancing overall fire safety."
                }
            ],
            svg: `
                <svg width="400" height="300" viewBox="0 0 400 300">
                    <circle cx="200" cy="150" r="140" fill="#1b5e20"/>
                    <circle cx="200" cy="150" r="120" fill="#2e7d32"/>
                    <text x="200" y="130" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="32" font-weight="bold">ZERO</text>
                    <text x="200" y="170" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="18">SMOKE & HALOGEN</text>
                    
                    <!-- ZERO symbol -->
                    <g transform="translate(200, 220)">
                        <circle cx="0" cy="0" r="40" fill="#ffffff" fill-opacity="0.2"/>
                        <text x="0" y="15" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="48" font-weight="bold">0</text>
                    </g>
                </svg>
            `,
            smallSvg: `
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="#1b5e20"/>
                    <circle cx="60" cy="60" r="40" fill="#2e7d32"/>
                    <text x="60" y="55" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="14" font-weight="bold">ZERO</text>
                    <text x="60" y="75" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="6">SMOKE & HALOGEN</text>
                </svg>
            `
        },
        thermo: {
            name: "THERMO",
            tagline: "Beyond FRLS - Heat Resistant Cable Technology",
            color: "#f9a825",
            description: `
                <p>Hills Cab THERMO cables go beyond standard Fire Resistant Low Smoke (FRLS) specifications, offering 
                superior heat resistance for the most demanding applications. These cables maintain their integrity and 
                performance even in high-temperature environments.</p>
                
                <p>With advanced thermal resistance properties, THERMO cables are ideal for installations where 
                cables are exposed to elevated temperatures and thermal stress.</p>
            `,
            features: [
                "Superior Heat Resistance",
                "Beyond Standard FRLS Specifications",
                "High Temperature Stability",
                "Extended Service Life in Hot Environments",
                "Excellent Electrical Properties at High Temperatures",
                "Reduced Risk of Thermal Damage",
                "Enhanced Safety in Heat-Prone Areas"
            ],
            applications: [
                "Industrial Heating Systems",
                "Furnace and Boiler Installations",
                "Hot Process Manufacturing",
                "Commercial Kitchen Equipment",
                "HVAC Systems",
                "Engine Compartments",
                "Heat-generating Machinery"
            ],
            specifications: {
                "Conductor": "Annealed Copper",
                "Insulation": "Special Heat Resistant Compound",
                "Sheath": "Heat Resistant FRLS Compound",
                "Voltage Rating": "1.1 kV",
                "Temperature Range": "-20°C to +120°C",
                "Standard": "IS 9968 / IEC 60245",
                "Available Sizes": "1.0 sq mm to 25.0 sq mm",
                "Core Options": "Single Core, Multi Core",
                "Special Feature": "High Temperature Resistance",
                "Heat Performance": "Maintains integrity up to 120°C continuous operation"
            },
            advantages: [
                {
                    icon: "fas fa-temperature-high",
                    title: "Heat Resistant",
                    description: "Withstands extreme temperatures up to 120°C without performance degradation."
                },
                {
                    icon: "fas fa-hourglass-half",
                    title: "Extended Lifespan",
                    description: "Superior thermal properties ensure longer service life in high-temperature environments."
                },
                {
                    icon: "fas fa-shield-alt",
                    title: "Thermal Protection",
                    description: "Advanced insulation materials provide enhanced protection against thermal breakdown."
                }
            ],
            svg: `
                <svg width="400" height="300" viewBox="0 0 400 300">
                    <rect x="50" y="50" width="300" height="200" fill="#f57f17"/>
                    <rect x="70" y="70" width="260" height="160" fill="#f9a825"/>
                    <text x="200" y="150" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="42" font-weight="bold">THERMO</text>
                    <text x="200" y="190" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="16">BEYOND FRLS</text>
                    
                    <!-- Heat waves symbol -->
                    <g transform="translate(200, 240)" stroke="#ffffff" stroke-width="3" fill="none">
                        <path d="M-80,0 C-70,-10 -60,10 -50,0 C-40,-10 -30,10 -20,0 C-10,-10 0,10 10,0 C20,-10 30,10 40,0 C50,-10 60,10 70,0 C80,-10 90,10 100,0" />
                    </g>
                </svg>
            `,
            smallSvg: `
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <rect x="10" y="10" width="100" height="100" fill="#f57f17"/>
                    <rect x="20" y="20" width="80" height="80" fill="#f9a825"/>
                    <text x="60" y="65" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="16" font-weight="bold">THERMO</text>
                    <text x="60" y="85" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="6">BEYOND FRLS</text>
                </svg>
            `
        },
        turbo: {
            name: "TURBO",
            tagline: "Hügel-Technologie - ETM Technology Cables",
            color: "#e65100",
            description: `
                <p>Hills Cab TURBO features innovative Hügel-Technologie with ETM (Electrical-Thermal-Mechanical) technology for 
                comprehensive protection. These cables provide integrated defense against electrical, thermal, and mechanical stresses.</p>
                
                <p>With zero smoke and zero halogen properties, TURBO cables offer enhanced safety along with superior performance 
                characteristics, making them ideal for demanding applications where reliability is critical.</p>
            `,
            features: [
                "ETM (Electrical-Thermal-Mechanical) Technology",
                "Hügel-Technologie German Innovation",
                "Zero Smoke Zero Halogen Properties",
                "Comprehensive Protection System",
                "Enhanced Electrical Performance",
                "Superior Thermal Stability",
                "Excellent Mechanical Durability"
            ],
            applications: [
                "Critical Industrial Systems",
                "Power Distribution Networks",
                "Manufacturing Facilities",
                "Infrastructure Projects",
                "Commercial Buildings",
                "High-rise Residential Complexes",
                "Heavy Machinery Installations"
            ],
            specifications: {
                "Conductor": "High Conductivity Annealed Copper",
                "Insulation": "Special ETM Compound",
                "Sheath": "Zero Halogen Flame Retardant Compound",
                "Voltage Rating": "1.1 kV",
                "Temperature Range": "-20°C to +90°C",
                "Standard": "IS 7098 / IEC 60502",
                "Available Sizes": "1.5 sq mm to 35.0 sq mm",
                "Core Options": "Single Core, Multi Core",
                "Special Feature": "ETM Technology Protection",
                "Performance": "Integrated Electrical-Thermal-Mechanical Protection"
            },
            advantages: [
                {
                    icon: "fas fa-bolt",
                    title: "Electrical Protection",
                    description: "Enhanced insulation properties provide superior protection against electrical failures."
                },
                {
                    icon: "fas fa-fire",
                    title: "Thermal Defense",
                    description: "Advanced thermal management prevents damage from heat and ensures stable performance."
                },
                {
                    icon: "fas fa-cog",
                    title: "Mechanical Strength",
                    description: "Reinforced construction offers excellent resistance to physical stress and mechanical damage."
                }
            ],
            svg: `
                <svg width="400" height="300" viewBox="0 0 400 300">
                    <rect x="50" y="50" width="300" height="200" fill="#bf360c"/>
                    <rect x="70" y="70" width="260" height="160" fill="#e65100"/>
                    <text x="200" y="150" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="42" font-weight="bold">TURBO</text>
                    <text x="200" y="190" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="16">HÜGEL-TECHNOLOGIE</text>
                    
                    <!-- ETM symbol -->
                    <g transform="translate(200, 240)">
                        <circle cx="0" cy="0" r="30" fill="#ffffff" fill-opacity="0.2"/>
                        <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="12" font-weight="bold">ETM</text>
                    </g>
                </svg>
            `,
            smallSvg: `
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <rect x="10" y="10" width="100" height="100" fill="#bf360c"/>
                    <rect x="20" y="20" width="80" height="80" fill="#e65100"/>
                    <text x="60" y="65" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="16" font-weight="bold">TURBO</text>
                    <text x="60" y="85" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="6">HÜGEL-TECHNOLOGIE</text>
                </svg>
            `
        },
        firex: {
            name: "FIREX",
            tagline: "Triple Layered FR Cables for Triple Protection with Tricare ETM",
            color: "#c62828",
            description: `
                <p>Hills Cab FIREX features a revolutionary triple-layered FR (Fire Retardant) construction that provides 
                unprecedented protection against fire hazards. Combined with Tricare ETM technology, these cables offer the 
                highest level of safety and reliability.</p>
                
                <p>Specially designed for environments where fire safety is critical, FIREX cables maintain circuit integrity 
                even during fire incidents, ensuring continued operation of essential systems.</p>
            `,
            features: [
                "Triple Layered Fire Retardant Construction",
                "Tricare ETM (Electrical-Thermal-Mechanical) Protection",
                "Enhanced Fire Resistance",
                "Circuit Integrity During Fire",
                "Low Smoke Emission",
                "Reduced Flame Propagation",
                "Superior Safety in Fire Conditions"
            ],
            applications: [
                "Emergency Systems",
                "Fire Alarm Circuits",
                "Safety and Security Installations",
                "Evacuation Systems",
                "Healthcare Facilities",
                "High-Occupancy Buildings",
                "Critical Infrastructure"
            ],
            specifications: {
                "Conductor": "Annealed Copper",
                "Insulation": "Triple Layer FR Compound",
                "Sheath": "Special FRLS Compound",
                "Voltage Rating": "1.1 kV",
                "Temperature Range": "-20°C to +105°C",
                "Standard": "IS 7098 / IEC 60331 / IEC 60332",
                "Available Sizes": "1.5 sq mm to 25.0 sq mm",
                "Core Options": "Single Core, Multi Core",
                "Special Feature": "Triple Layer Protection",
                "Fire Performance": "Circuit Integrity in Fire for up to 3 hours"
            },
            advantages: [
                {
                    icon: "fas fa-fire-extinguisher",
                    title: "Fire Resistant",
                    description: "Maintains circuit integrity during fire, ensuring critical systems remain operational."
                },
                {
                    icon: "fas fa-layer-group",
                    title: "Triple Protection",
                    description: "Three layers of specialized fire-retardant materials provide unmatched safety."
                },
                {
                    icon: "fas fa-shield-alt",
                    title: "Tricare ETM",
                    description: "Comprehensive protection against electrical, thermal and mechanical stresses in fire conditions."
                }
            ],
            svg: `
                <svg width="400" height="300" viewBox="0 0 400 300">
                    <rect x="50" y="50" width="300" height="200" fill="#b71c1c"/>
                    <rect x="70" y="70" width="260" height="160" fill="#c62828"/>
                    <text x="200" y="150" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="42" font-weight="bold">FIREX</text>
                    <text x="200" y="190" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="14">TRIPLE LAYERED FR CABLES</text>
                    
                    <!-- Triple layer symbol -->
                    <g transform="translate(160, 230)">
                        <rect x="0" y="0" width="80" height="8" rx="4" ry="4" fill="#ffffff" fill-opacity="0.8"/>
                        <rect x="0" y="12" width="80" height="8" rx="4" ry="4" fill="#ffffff" fill-opacity="0.6"/>
                        <rect x="0" y="24" width="80" height="8" rx="4" ry="4" fill="#ffffff" fill-opacity="0.4"/>
                    </g>
                </svg>
            `,
            smallSvg: `
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <rect x="10" y="10" width="100" height="100" fill="#b71c1c"/>
                    <rect x="20" y="20" width="80" height="80" fill="#c62828"/>
                    <text x="60" y="65" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="16" font-weight="bold">FIREX</text>
                    <text x="60" y="85" text-anchor="middle" fill="#ffffff" font-family="Montserrat" font-size="5">TRIPLE LAYERED FR CABLES</text>
                </svg>
            `
        }
    };
    
    // Return product data or default to earthx if product type not found
    return products[productType] || products.earthx;
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('inquiryName').value;
            const email = document.getElementById('inquiryEmail').value;
            const phone = document.getElementById('inquiryPhone').value;
            const product = document.getElementById('inquiryProduct').value;
            const message = document.getElementById('inquiryMessage').value;
            
            // Validate form (simple validation)
            if (!name || !email || !phone || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real implementation, you would send this data to the server
            // For this demo, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.backgroundColor = '#4caf50';
            successMessage.style.color = '#fff';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = '4px';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.textContent = 'Thank you! Your inquiry has been sent successfully. We will contact you shortly.';
            
            // Clear form
            inquiryForm.reset();
            
            // Insert success message after form
            inquiryForm.parentNode.insertBefore(successMessage, inquiryForm.nextSibling);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 5000);
        });
    }
});
