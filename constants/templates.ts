export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/templates/blank-document.svg",
    initialContent: ``,
  },
  {
    id: "software-proposal",
    label: "Software development proposal",
    imageUrl: "/templates/software-proposal.svg",
    initialContent: `
      <div class="document">
        <header class="document-header">
          <div class="logo-quarter-circle"></div>
          <h1 class="document-title">
            <span>SOFTWARE</span>
            <span>DEVELOPMENT</span>
            <span>PROPOSAL</span>
          </h1>
        </header>
        <footer class="document-footer">
          <div class="footer-section">
            <p class="footer-label">PREPARED FOR</p>
            <p class="footer-value">Client's name</p>
            <p class="footer-value">Client's company name</p>
          </div>
          <div class="footer-section">
            <p class="footer-label">PREPARED BY</p>
            <p class="footer-value">Your name</p>
            <p class="footer-value">Your company name</p>
          </div>
        </footer>
      </div>
    `,
  },
  {
    id: "project-proposal",
    label: "Project proposal",
    imageUrl: "/templates/project-proposal.svg",
    initialContent: `
      <header>
        <h1>Project Name</h1>
        <p><time datetime="20XX-04-09">09.04.20XX</time></p>
      </header>
      <main>
        <section>
          <h2>Project Overview</h2>
          <p>This section would contain details about the project.</p>
        </section>
      </main>
      <footer>
        <address>
          <p>Your Name</p>
          <p>Your Company</p>
          <p>123 Your Street</p>
          <p>Your City, ST 12345</p>
        </address>
      </footer>
    `,
  },
  {
    id: "business-letter",
    label: "Business letter",
    imageUrl: "/templates/business-letter.svg",
    initialContent: `
      <header>
        <h1>YOUR COMPANY</h1>
        <hr>
      </header>
      <address>
        <ul>
          <li>123 YOUR STREET</li>
          <li>YOUR CITY, ST 12345</li>
          <li>(123) 456-7890</li>
          <li>MYEMAIL@EXAMPLE.COM</li>
        </ul>
      </address>
      <time datetime="20XX-09-24">September 24, 20XX</time>
      <section>
        <p>Dear Ms. Reader,</p>  
        <blockquote>
          <p>Thank you for your interest in our services.</p>
          <p>We are pleased to provide you with our latest product offerings.</p>
          <p>Our team has extensive experience in business solutions.</p>
          <p>We look forward to discussing this opportunity further.</p>
          <p>Please contact us if you have any questions.</p>
        </blockquote>
      </section>
      <footer>
        <p>Sincerely,</p>
        <p><strong>YOUR NAME</strong></p>
        <hr>
      </footer>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/templates/resume.svg",
    initialContent: `
      <header>
        <p><strong>Hello,</strong></p>
        <h1>I'm Your Name</h1>
      </header>
      <address>
        <p>123 YOUR STREET</p>
        <p>YOUR CITY, ST 12345</p>
        <p>TEL: 555.555.5555</p>
        <p>YOU.REPLY@EXAMPLE.COM</p>
      </address>
      <br>
      <section>
        <h2>Skills</h2>
        <p>Skills description here. Core competencies and key abilities.</p>
      </section>
      <br>
      <section>
        <h2>Experience</h2>
        <article>
          <p><small>MONTH 20XX – MONTH 20YY</small></p>
          <h3>Company Name, Location — Job Title</h3>
          <ul>
            <li>Key responsibility or achievement</li>
          </ul>
        </article>
      </section>
      <br>
      <section>
        <h2>Education</h2>
        <h3>College Name, Location — Degree</h3>
      </section>
      <br>
      <section>
        <h2>Awards</h2>
        <p>Notable achievement or recognition.</p>
      </section>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover letter",
    imageUrl: "/templates/cover-letter.svg",
    initialContent: `
      <address>
        <strong>Your Name</strong><br>
        123 Your Street<br>
        Your City, ST 12345<br>
        Phone: (555) 555-5555<br>
        Email: your.email@example.com
      </address>
      <h1>September 24, 2024</h1>
      <address>
        <strong>Hiring Manager</strong><br>
        Company Name<br>
        123 Company Street<br>
        Company City, ST 12345
      </address>
      <p>Dear Hiring Manager,</p>
      <p>First paragraph of the letter goes here. It should explain why you are writing and briefly introduce your interest in the position.</p>
      <p>Second paragraph of the letter continues with details about your qualifications, experience, and how they align with the role.</p>
      <p>Third paragraph of the letter concludes with a call to action, such as requesting an interview or further discussion.</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <p>Sincerely,</p>
      <p>Your Name</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/templates/letter.svg",
    initialContent: `
      <header>
        <h1>Your Band</h1>
        <time datetime="20XX-09-24">September 24, 20XX</time>
      </header>
      <main>
        <section>
          <h2>Hello fan,</h2>
        </section>
        <article>
          <h3>First, a big thank you!</h3>
          <p>Thanks for being such an amazing supporter of our music.</p>
          <p>We're excited to announce our new album is coming soon.</p>
          <p>You'll be the first to hear our latest singles.</p>
          <p>We're planning something special for our loyal fans.</p>
          <p>Stay tuned for exclusive content and updates.</p>
          <p>Can't wait to see you at our next show.</p>
        </article>
        <footer>
          <p>Lots of love,</p>
          <p>Your Name</p>
        </footer>
      </main>
    `,
  },
];
