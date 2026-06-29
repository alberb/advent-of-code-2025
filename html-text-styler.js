/**
 * HTML Text Styler
 * A utility module to add HTML styling to text blocks
 * Supports various text formatting options like bold, italic, colors, and more
 */

class HTMLTextStyler {
  /**
   * Create a new HTMLTextStyler instance
   */
  constructor() {
    this.styles = {};
  }

  /**
   * Make text bold
   * @param {string} text - The text to style
   * @returns {string} HTML string with bold styling
   */
  bold(text) {
    return `<strong>${this.escapeHtml(text)}</strong>`;
  }

  /**
   * Make text italic
   * @param {string} text - The text to style
   * @returns {string} HTML string with italic styling
   */
  italic(text) {
    return `<em>${this.escapeHtml(text)}</em>`;
  }

  /**
   * Underline text
   * @param {string} text - The text to style
   * @returns {string} HTML string with underline styling
   */
  underline(text) {
    return `<u>${this.escapeHtml(text)}</u>`;
  }

  /**
   * Strike through text
   * @param {string} text - The text to style
   * @returns {string} HTML string with strikethrough styling
   */
  strikethrough(text) {
    return `<s>${this.escapeHtml(text)}</s>`;
  }

  /**
   * Add color to text
   * @param {string} text - The text to style
   * @param {string} color - CSS color value (e.g., 'red', '#FF0000', 'rgb(255,0,0)')
   * @returns {string} HTML string with color styling
   */
  color(text, color) {
    return `<span style="color: ${this.sanitizeColor(color)};">${this.escapeHtml(text)}</span>`;
  }

  /**
   * Add background color to text
   * @param {string} text - The text to style
   * @param {string} bgColor - CSS color value for background
   * @returns {string} HTML string with background color styling
   */
  backgroundColor(text, bgColor) {
    return `<span style="background-color: ${this.sanitizeColor(bgColor)};">${this.escapeHtml(text)}</span>`;
  }

  /**
   * Set font size
   * @param {string} text - The text to style
   * @param {string} size - Font size (e.g., '14px', '1.5em', 'large')
   * @returns {string} HTML string with font size styling
   */
  fontSize(text, size) {
    return `<span style="font-size: ${this.sanitizeSize(size)};">${this.escapeHtml(text)}</span>`;
  }

  /**
   * Set font family
   * @param {string} text - The text to style
   * @param {string} fontFamily - Font family name
   * @returns {string} HTML string with font family styling
   */
  fontFamily(text, fontFamily) {
    return `<span style="font-family: ${this.sanitizeFontFamily(fontFamily)};">${this.escapeHtml(text)}</span>`;
  }

  /**
   * Create a heading
   * @param {string} text - The text to style
   * @param {number} level - Heading level (1-6)
   * @returns {string} HTML heading tag
   */
  heading(text, level = 1) {
    const validLevel = Math.max(1, Math.min(6, parseInt(level)));
    return `<h${validLevel}>${this.escapeHtml(text)}</h${validLevel}>`;
  }

  /**
   * Create a paragraph
   * @param {string} text - The text to style
   * @returns {string} HTML paragraph tag
   */
  paragraph(text) {
    return `<p>${this.escapeHtml(text)}</p>`;
  }

  /**
   * Create a code block
   * @param {string} text - The text to style
   * @param {string} language - Optional language for syntax highlighting class
   * @returns {string} HTML code block
   */
  codeBlock(text, language = '') {
    const langClass = language ? ` class="language-${this.escapeHtml(language)}"` : '';
    return `<pre><code${langClass}>${this.escapeHtml(text)}</code></pre>`;
  }

  /**
   * Create inline code
   * @param {string} text - The text to style
   * @returns {string} HTML inline code tag
   */
  inlineCode(text) {
    return `<code>${this.escapeHtml(text)}</code>`;
  }

  /**
   * Create a link
   * @param {string} text - The link text
   * @param {string} url - The URL
   * @param {string} title - Optional title attribute
   * @returns {string} HTML anchor tag
   */
  link(text, url, title = '') {
    const titleAttr = title ? ` title="${this.escapeHtml(title)}"` : '';
    return `<a href="${this.sanitizeUrl(url)}"${titleAttr}>${this.escapeHtml(text)}</a>`;
  }

  /**
   * Combine multiple styles
   * @param {string} text - The text to style
   * @param {Object} styles - Object with style properties
   * @returns {string} HTML string with combined styling
   */
  combine(text, styles = {}) {
    let styledText = this.escapeHtml(text);

    if (styles.bold) styledText = `<strong>${styledText}</strong>`;
    if (styles.italic) styledText = `<em>${styledText}</em>`;
    if (styles.underline) styledText = `<u>${styledText}</u>`;
    if (styles.strikethrough) styledText = `<s>${styledText}</s>`;

    let cssStyles = [];
    if (styles.color) cssStyles.push(`color: ${this.sanitizeColor(styles.color)}`);
    if (styles.backgroundColor) cssStyles.push(`background-color: ${this.sanitizeColor(styles.backgroundColor)}`);
    if (styles.fontSize) cssStyles.push(`font-size: ${this.sanitizeSize(styles.fontSize)}`);
    if (styles.fontFamily) cssStyles.push(`font-family: ${this.sanitizeFontFamily(styles.fontFamily)}`);

    if (cssStyles.length > 0) {
      styledText = `<span style="${cssStyles.join('; ')};">${styledText}</span>`;
    }

    return styledText;
  }

  /**
   * Create a styled text block with padding and border
   * @param {string} text - The text to style
   * @param {Object} options - Styling options
   * @returns {string} HTML div with styled text block
   */
  textBlock(text, options = {}) {
    const {
      padding = '10px',
      border = '1px solid #ccc',
      borderRadius = '4px',
      backgroundColor = '#f9f9f9',
      color = '#333',
      fontSize = '14px',
      textAlign = 'left'
    } = options;

    const styles = [
      `padding: ${this.sanitizeSize(padding)}`,
      `border: ${border}`,
      `border-radius: ${this.sanitizeSize(borderRadius)}`,
      `background-color: ${this.sanitizeColor(backgroundColor)}`,
      `color: ${this.sanitizeColor(color)}`,
      `font-size: ${this.sanitizeSize(fontSize)}`,
      `text-align: ${textAlign}`
    ].join('; ');

    return `<div style="${styles};">${this.escapeHtml(text)}</div>`;
  }

  /**
   * Escape HTML special characters to prevent XSS
   * @param {string} text - The text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, (char) => map[char]);
  }

  /**
   * Sanitize color values
   * @param {string} color - The color value
   * @returns {string} Sanitized color
   */
  sanitizeColor(color) {
    // Allow named colors, hex, rgb, rgba
    if (/^(#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6}|rgb\(|rgba\(|[a-z]+)/.test(color)) {
      return color;
    }
    return '#000000'; // Default to black if invalid
  }

  /**
   * Sanitize size values
   * @param {string} size - The size value
   * @returns {string} Sanitized size
   */
  sanitizeSize(size) {
    if (/^(\d+(\.\d+)?(px|em|rem|%|pt|cm|mm|in|ex|ch|vw|vh))$/.test(size)) {
      return size;
    }
    return '1em'; // Default size
  }

  /**
   * Sanitize font family values
   * @param {string} fontFamily - The font family
   * @returns {string} Sanitized font family
   */
  sanitizeFontFamily(fontFamily) {
    // Remove quotes and validate
    const cleaned = fontFamily.replace(/['"]/g, '');
    if (/^[a-zA-Z0-9\s,\-]+$/.test(cleaned)) {
      return `"${cleaned}"`;
    }
    return '"Arial", sans-serif'; // Default font
  }

  /**
   * Sanitize URL values
   * @param {string} url - The URL
   * @returns {string} Sanitized URL
   */
  sanitizeUrl(url) {
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
      return url;
    }
    return '#'; // Default to hash if invalid
  }
}

// Export for use in Node.js
module.exports = HTMLTextStyler;

// Example usage
if (require.main === module) {
  const styler = new HTMLTextStyler();

  console.log('=== HTML Text Styler Examples ===\n');

  console.log('Bold:', styler.bold('This is bold text'));
  console.log('Italic:', styler.italic('This is italic text'));
  console.log('Underline:', styler.underline('This is underlined text'));
  console.log('Strikethrough:', styler.strikethrough('This is struck through'));
  console.log('Color:', styler.color('Red text', 'red'));
  console.log('Background:', styler.backgroundColor('Yellow background', 'yellow'));
  console.log('Font Size:', styler.fontSize('Larger text', '20px'));
  console.log('Font Family:', styler.fontFamily('Serif text', 'Georgia, serif'));
  console.log('Heading:', styler.heading('Main Title', 1));
  console.log('Paragraph:', styler.paragraph('This is a paragraph of text.'));
  console.log('Inline Code:', styler.inlineCode('const x = 5;'));
  console.log('Code Block:', styler.codeBlock('function hello() {\n  console.log("Hello");\n}', 'javascript'));
  console.log('Link:', styler.link('Click here', 'https://example.com', 'Example Site'));

  console.log('\nCombined Styles:', styler.combine('Bold, italic, and red', {
    bold: true,
    italic: true,
    color: 'red'
  }));

  console.log('\nText Block:', styler.textBlock('This is a styled text block with padding and border', {
    padding: '15px',
    backgroundColor: '#e8f4f8',
    color: '#0066cc',
    fontSize: '16px',
    border: '2px solid #0066cc'
  }));
}
