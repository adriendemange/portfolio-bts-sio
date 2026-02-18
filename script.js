// ===================================
// PORTFOLIO BTS SIO - JAVASCRIPT
// Cybersecurity Theme
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

  // ===================================
  // NAVIGATION
  // ===================================

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');

    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Section navigation - Show/Hide sections
  const allSections = document.querySelectorAll('.section');

  // Function to show only the selected section
  function showSection(sectionId) {
    allSections.forEach(section => {
      if (section.id === sectionId.replace('#', '')) {
        section.classList.add('active-section');
        section.classList.remove('hidden-section');
      } else {
        section.classList.remove('active-section');
        section.classList.add('hidden-section');
      }
    });

    // Update active nav link
    navLinks.forEach(link => {
      if (link.getAttribute('href') === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll to top instantly
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }

  // Navigation link click handler - handle ALL internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      showSection(targetId);

      // Close mobile menu if open
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Show home section by default
  showSection('#home');

  // ===================================
  // HERO ANIMATED BACKGROUND - MATRIX RAIN
  // ===================================

  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Matrix rain configuration
  const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]();:=+-*&|~^%$#@!';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = new Array(columns).fill(1);

  window.addEventListener('resize', function () {
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(1);
  });

  function drawMatrixRain() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = 'rgba(5, 10, 14, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      // Random character
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];

      // Vary the green color intensity
      const brightness = Math.random();
      if (brightness > 0.95) {
        ctx.fillStyle = '#ffffff'; // Occasional bright white
      } else if (brightness > 0.8) {
        ctx.fillStyle = '#00ff41'; // Bright green
      } else {
        ctx.fillStyle = `rgba(0, 255, 65, ${0.3 + Math.random() * 0.4})`; // Dimmer green
      }

      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      // Reset drop to top randomly after reaching bottom
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(drawMatrixRain);
  }

  drawMatrixRain();

  // ===================================
  // SCROLL ANIMATIONS
  // ===================================

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars when skills section is visible
        if (entry.target.closest('#skills')) {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const fadeElements = document.querySelectorAll('.card, .section-title');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // ===================================
  // SKILL BARS ANIMATION
  // ===================================

  let skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.classList.add('animate');
      }, index * 100);
    });
  }

  // ===================================
  // CONTACT FORM VALIDATION
  // ===================================

  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate individual field
  function validateField(input, error, validationFn) {
    if (validationFn(input.value)) {
      input.style.borderColor = 'rgba(0, 255, 255, 0.2)';
      error.classList.remove('show');
      return true;
    } else {
      input.style.borderColor = '#ef4444';
      error.classList.add('show');
      return false;
    }
  }

  // Real-time validation
  nameInput.addEventListener('blur', function () {
    validateField(nameInput, nameError, val => val.trim().length > 0);
  });

  emailInput.addEventListener('blur', function () {
    validateField(emailInput, emailError, val => emailRegex.test(val));
  });

  subjectInput.addEventListener('blur', function () {
    validateField(subjectInput, subjectError, val => val.trim().length > 0);
  });

  messageInput.addEventListener('blur', function () {
    validateField(messageInput, messageError, val => val.trim().length > 10);
  });

  // Form submission
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField(nameInput, nameError, val => val.trim().length > 0);
    const isEmailValid = validateField(emailInput, emailError, val => emailRegex.test(val));
    const isSubjectValid = validateField(subjectInput, subjectError, val => val.trim().length > 0);
    const isMessageValid = validateField(messageInput, messageError, val => val.trim().length > 10);

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // Form is valid - in a real application, you would send the data to a server
      console.log('Form submitted successfully!');

      // Show success message
      alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');

      // Reset form
      contactForm.reset();

      // Reset border colors
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.style.borderColor = 'rgba(0, 255, 255, 0.2)';
      });
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.form-error.show');
      if (firstError) {
        firstError.previousElementSibling.focus();
      }
    }
  });

  // ===================================
  // TYPING EFFECT FOR HERO SUBTITLE
  // ===================================

  const heroSubtitle = document.querySelector('.hero-subtitle');
  const originalText = heroSubtitle.textContent;

  function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    // Start typing after initial animation
    setTimeout(type, 800);
  }

  // Uncomment to enable typing effect
  // typeWriter(heroSubtitle, originalText, 80);

  // ===================================
  // CURSOR GLOW EFFECT
  // ===================================

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Create glow effect on cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ===================================
  // PERFORMANCE OPTIMIZATION
  // ===================================

  // Pause canvas animation when not visible
  let isHeroVisible = true;

  const heroObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      isHeroVisible = entry.isIntersecting;
    });
  }, { threshold: 0.1 });

  const heroSection = document.querySelector('.hero');
  heroObserver.observe(heroSection);

  // ===================================
  // CONSOLE MESSAGE
  // ===================================

  console.log('%c🔒 Portfolio BTS SIO - Cybersécurité', 'color: #00ff41; font-size: 20px; font-weight: bold;');
  console.log('%cSi vous lisez ceci, vous êtes probablement curieux ! 👀', 'color: #00e5ff; font-size: 14px;');
  console.log('%cN\'hésitez pas à explorer le code source sur GitHub.', 'color: #5a7a5a; font-size: 12px;');

  // ===================================
  // TERMINAL PROJECT RUNNER
  // ===================================

  const projectSelect = document.getElementById('projectSelect');
  const runProjectBtn = document.getElementById('runProjectBtn');
  const terminalOutput = document.getElementById('terminalOutput');

  if (projectSelect && runProjectBtn && terminalOutput) {

    // Project definitions
    const projects = {
      fizzbuzz: {
        name: 'FizzBuzz',
        code: `# FizzBuzz - Python
def fizzbuzz(n):
    for i in range(1, n + 1):
        if i % 15 == 0:
            print("FizzBuzz")
        elif i % 3 == 0:
            print("Fizz")
        elif i % 5 == 0:
            print("Buzz")
        else:
            print(i)

fizzbuzz(20)`,
        run: function () {
          let output = '';
          for (let i = 1; i <= 20; i++) {
            if (i % 15 === 0) output += 'FizzBuzz\n';
            else if (i % 3 === 0) output += 'Fizz\n';
            else if (i % 5 === 0) output += 'Buzz\n';
            else output += i + '\n';
          }
          return output;
        }
      },

      fibonacci: {
        name: 'Suite de Fibonacci',
        code: `# Suite de Fibonacci - Python
def fibonacci(n):
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

result = fibonacci(15)
print("Les 15 premiers nombres de Fibonacci:")
print(result)`,
        run: function () {
          const fib = [0, 1];
          for (let i = 2; i < 15; i++) {
            fib.push(fib[i - 1] + fib[i - 2]);
          }
          return `Les 15 premiers nombres de Fibonacci:\n[${fib.join(', ')}]`;
        }
      },

      prime: {
        name: 'Vérificateur de nombres premiers',
        code: `# Vérificateur de nombres premiers - Python
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# Test avec quelques nombres
test_numbers = [2, 7, 10, 13, 17, 20, 23, 29, 30, 31]
for num in test_numbers:
    status = "PREMIER" if is_prime(num) else "NON PREMIER"
    print(f"{num} -> {status}")`,
        run: function () {
          function isPrime(n) {
            if (n < 2) return false;
            for (let i = 2; i <= Math.sqrt(n); i++) {
              if (n % i === 0) return false;
            }
            return true;
          }
          const testNumbers = [2, 7, 10, 13, 17, 20, 23, 29, 30, 31];
          let output = 'Test de primalité:\n\n';
          testNumbers.forEach(num => {
            const status = isPrime(num) ? '✓ PREMIER' : '✗ NON PREMIER';
            output += `${num.toString().padStart(2)} -> ${status}\n`;
          });
          return output;
        }
      },

      password: {
        name: 'Générateur de mot de passe',
        code: `# Générateur de mot de passe sécurisé - Python
import random
import string

def generate_password(length=16):
    chars = string.ascii_letters + string.digits + "!@#$%^&*"
    password = ''.join(random.choice(chars) for _ in range(length))
    return password

# Génération de 5 mots de passe
print("Génération de mots de passe sécurisés:")
for i in range(5):
    pwd = generate_password(16)
    print(f"  {i+1}. {pwd}")`,
        run: function () {
          function generatePassword(length = 16) {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
            let password = '';
            for (let i = 0; i < length; i++) {
              password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return password;
          }
          let output = 'Génération de mots de passe sécurisés (16 caractères):\n\n';
          for (let i = 1; i <= 5; i++) {
            output += `  ${i}. ${generatePassword(16)}\n`;
          }
          output += '\n✓ Longueur: 16 caractères\n✓ Inclut: majuscules, minuscules, chiffres, symboles';
          return output;
        }
      },

      scanner: {
        name: 'Simulateur de scan de ports',
        code: `# Simulateur de scan de ports - Python
import socket

def scan_ports(target, ports):
    print(f"Scan de {target}...")
    print("-" * 40)
    for port in ports:
        status = "OUVERT" if check_port(target, port) else "FERMÉ"
        service = get_service(port)
        print(f"Port {port:5} [{service:10}] -> {status}")

# Simulation de scan
common_ports = [21, 22, 23, 25, 53, 80, 443, 3306, 3389, 8080]
scan_ports("192.168.1.1", common_ports)`,
        run: function () {
          const ports = [
            { port: 21, service: 'FTP', open: false },
            { port: 22, service: 'SSH', open: true },
            { port: 23, service: 'Telnet', open: false },
            { port: 25, service: 'SMTP', open: false },
            { port: 53, service: 'DNS', open: true },
            { port: 80, service: 'HTTP', open: true },
            { port: 443, service: 'HTTPS', open: true },
            { port: 3306, service: 'MySQL', open: false },
            { port: 3389, service: 'RDP', open: false },
            { port: 8080, service: 'HTTP-Alt', open: true }
          ];

          let output = '🔍 Scan de ports sur 192.168.1.1 (simulation)\n';
          output += '━'.repeat(45) + '\n\n';

          ports.forEach((p, index) => {
            setTimeout(() => { }, index * 100); // Visual delay simulation
            const status = p.open ? '🟢 OUVERT' : '🔴 FERMÉ';
            output += `Port ${p.port.toString().padStart(5)} [${p.service.padEnd(8)}] -> ${status}\n`;
          });

          output += '\n' + '━'.repeat(45) + '\n';
          output += `Scan terminé: ${ports.filter(p => p.open).length} ports ouverts / ${ports.length} ports scannés`;
          return output;
        }
      }
    };

    // Run button click handler
    runProjectBtn.addEventListener('click', function () {
      const selectedProject = projectSelect.value;
      const project = projects[selectedProject];

      if (project) {
        // Show loading animation
        terminalOutput.innerHTML = `<span style="color: #00ff41;">$</span> python ${project.name.toLowerCase().replace(/ /g, '_')}.py\n<span style="color: #ffbd2e;">Exécution en cours...</span>`;

        // Simulate execution delay
        setTimeout(() => {
          let output = `<span style="color: #00ff41;">$</span> python ${project.name.toLowerCase().replace(/ /g, '_')}.py\n\n`;
          output += `<span style="color: #5a7a5a;">## ${project.name}</span>\n`;
          output += `<span style="color: #5a7a5a;"># ${'─'.repeat(40)}</span>\n\n`;
          output += `<span style="color: #00ff41;">${project.run()}</span>\n\n`;
          output += `<span style="color: #5a7a5a;"># Exécution terminée avec succès ✓</span>`;

          terminalOutput.innerHTML = output;
        }, 500);
      }
    });

    // Show code on project change
    projectSelect.addEventListener('change', function () {
      const selectedProject = projectSelect.value;
      const project = projects[selectedProject];

      if (project) {
        let output = `<span style="color: #00ffff;">$</span> cat ${project.name.toLowerCase().replace(/ /g, '_')}.py\n\n`;
        output += `<span style="color: #9ca3af;">${project.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>\n\n`;
        output += `<span style="color: #ffbd2e;"># Cliquez sur "Exécuter" pour lancer ce projet</span>`;

        terminalOutput.innerHTML = output;
      }
    });
  }

});

