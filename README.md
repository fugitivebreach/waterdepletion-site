# Water Depletion School Project Website

A dynamic, interactive website for presenting information about water depletion with smooth animations and customizable content through JSON configuration.

## Features

- **Dynamic Content Loading**: All content is loaded from `config.json`
- **Responsive Grid Layout**: Automatically adjusts from 3-column to single-column based on screen size
- **LED Text Animation**: Smooth color-changing text effects for titles
- **Water Theme Animations**: 
  - Animated water background with flowing effects
  - Custom cursor animation showing water drops going into a trashcan
- **Smooth Interactions**: Hover effects, transitions, and scroll animations
- **Mobile Responsive**: Works perfectly on all device sizes

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript functionality
├── config.json         # Content configuration
└── README.md           # This file
```

## Configuration (config.json)

### Main Structure

```json
{
  "TopicTitle": "Your Topic Title",
  "TopicDescription": "Your topic description goes here",
  "ledTextColors": ["#hex1", "#hex2", "#hex3"],
  "GridParts": [...]
}
```

### Grid Part Structure

Each grid part supports the following properties:

```json
{
  "GridPartTitle": "Title of this section",
  "LedText": true/false,
  "TextColor": "#hexcolor (only used if LedText is false)",
  "GridPartDescription": "Description text for this section",
  "GridPartBulletin": [
    "Bullet point 1",
    "Bullet point 2",
    null  // null values are ignored
  ],
  "GridPartImageLink": "URL to image (optional)"
}
```

### Properties Explained

- **TopicTitle**: Main title displayed at the top of the page
- **TopicDescription**: Subtitle/description under the main title
- **ledTextColors**: Array of hex colors for LED text animation cycle
- **LedText**: If `true`, title will cycle through LED colors; if `false`, uses TextColor
- **TextColor**: Static color for title (only when LedText is false)
- **GridPartBulletin**: Array of bullet points (supports null values)
- **GridPartImageLink**: URL to display an image under the content

## Layout Behavior

- **1 Grid Part**: Displays centered on the page
- **2-3 Grid Parts**: Displays in a responsive grid
- **4+ Grid Parts**: Displays in a 3-column grid (responsive)

## Customization

### Changing Colors

1. **LED Text Colors**: Modify the `ledTextColors` array in `config.json`
2. **Background**: Edit the gradient in `.water-background` in `styles.css`
3. **Grid Part Colors**: Modify `TextColor` property for individual parts

### Adding Content

1. Add new objects to the `GridParts` array in `config.json`
2. The website will automatically adjust the layout

### Modifying Animations

- **Water Background**: Adjust `@keyframes waterLevel` in `styles.css`
- **LED Text Speed**: Change the duration in `ledColorCycle` animation
- **Cursor Animation**: Modify `.water-drop` and `@keyframes dropAnimation`

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Requires JavaScript enabled

## Usage

### Method 1: Using Python Flask Server (Recommended)

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the Flask server:
   ```bash
   python app.py
   ```

3. Open your browser and go to: `http://localhost:5000`

### Method 2: Direct File Access

1. Open `index.html` in a web browser
2. The website will automatically load content from `config.json`
3. Customize content by editing `config.json`

### Customizing Content

- Edit `config.json` to change all content
- The server will automatically reload when you save changes (if using Flask)

## Troubleshooting

- **Content not loading**: Check that `config.json` is valid JSON
- **Images not showing**: Verify image URLs are accessible
- **Animations not working**: Ensure JavaScript is enabled in browser

## Example Use Cases

- School presentations on environmental topics
- Science project displays
- Educational content with visual appeal
- Any topic requiring structured information display

Perfect for water depletion awareness projects with its thematic water animations and professional presentation style!
