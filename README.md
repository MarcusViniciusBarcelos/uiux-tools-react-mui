# 🎨 UX/UI Tools for React + Material-UI (MCP Server)

[![npm version](https://badge.fury.io/js/@marcusbarcelos%2Fuiux-tools-react-mui.svg)](https://www.npmjs.com/package/@MarcusViniciusBarcelos/uiux-tools-react-mui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Model Context Protocol (MCP) Server** that provides AI-powered tools to apply UX/UI best practices to React components with Material-UI.

Perfect for use with **GitHub Copilot**, **Claude Desktop**, and other AI assistants that support MCP.

---

## ✨ Features

- �� **Responsive Design** - Mobile-first patterns with MUI breakpoints
- 🎨 **Material-UI Best Practices** - Theme spacing, alpha transparency, sx prop
- 🍎 **Apple Design Patterns** - Custom scrollbars, smooth animations, minimalist design
- 🎯 **Nielsen's 10 Heuristics** - Complete usability guidelines
- 🧠 **Cognitive Biases** - Fitts's Law, Grouping Effect, Proximity Principle, and more
- ✅ **UX Checklist** - Ready-to-use validation checklist

---

## 📦 Installation

### Option 1: Via npx (Recommended)

No installation needed! Use directly with npx:

```bash
npx @marcusbarcelos/uiux-tools-react-mui
```

### Option 2: Global Installation

```bash
npm install -g @marcusbarcelos/uiux-tools-react-mui
```

### Option 3: Docker

```bash
docker run -i marcusbarcelos/uiux-tools-react-mui
```

---

## ⚙️ Configuration

### GitHub Copilot (VS Code)

Add to your `~/.config/Code/User/mcp.json` (Linux/Mac) or `%APPDATA%\Code\User\mcp.json` (Windows):

```json
{
  "servers": {
    "uiux-tools": {
      "command": "npx",
      "args": ["-y", "@MarcusViniciusBarcelos/uiux-tools-react-mui"]
    }
  }
}
```

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (Mac) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "uiux-tools": {
      "command": "npx",
      "args": ["-y", "@MarcusViniciusBarcelos/uiux-tools-react-mui"]
    }
  }
}
```

### Docker Configuration

```json
{
  "servers": {
    "uiux-tools": {
      "command": "docker",
      "args": ["run", "-i", "MarcusViniciusBarcelos/uiux-tools-react-mui"]
    }
  }
}
```

---

## 🚀 Available Tools

### 1. `apply_responsiveness`
Apply mobile-first responsive design patterns.

**Input:**
- `component`: Component code or filename

**Example:**
```
Use tool apply_responsiveness on src/components/MyComponent.tsx
```

### 2. `apply_material_ui_best_practices`
Apply Material-UI best practices (theme.spacing, alpha, sx prop).

### 3. `apply_apple_design`
Apply Apple design patterns (custom scrollbar, animations, minimalism).

### 4. `apply_nielsen_heuristic`
Apply specific Nielsen heuristic (1-10).

**Input:**
- `component`: Component code
- `heuristic`: Heuristic number (1-10)

**Example:**
```
Use tool apply_nielsen_heuristic with heuristic=1 on current component
```

### 5. `apply_cognitive_bias`
Apply cognitive bias for better UX.

**Input:**
- `component`: Component code
- `bias`: One of `fitts`, `grouping`, `proximity`, `zeigarnik`, `serial-position`, `hicks`

### 6. `apply_complete_ux`
Apply ALL UX/UI guidelines at once.

### 7. `get_ux_checklist`
Get validation checklist for UX/UI review.

---

## 💡 Usage Examples

### With GitHub Copilot

```
Use tool apply_complete_ux on src/components/Notification.tsx
```

```
Use tool get_ux_checklist
```

```
Use tool apply_responsiveness on current file
```

### With Claude Desktop

Simply ask:
> "Apply complete UX guidelines to this component"

> "Show me the UX checklist"

---

## 📚 What's Included

### Nielsen's 10 Usability Heuristics

1. **Visibility of System Status** - Loading states, progress indicators
2. **Match Between System and Real World** - User-friendly language
3. **User Control and Freedom** - Cancel buttons, undo actions
4. **Consistency and Standards** - Uniform colors, icons, patterns
5. **Error Prevention** - Real-time validation, input limits
6. **Recognition Rather Than Recall** - Visible options, tooltips
7. **Flexibility and Efficiency** - Keyboard shortcuts, quick actions
8. **Aesthetic and Minimalist Design** - Remove visual noise
9. **Help Users Recognize Errors** - Clear error messages, suggestions
10. **Help and Documentation** - Tooltips, helper text, placeholders

### Cognitive Biases

- **Fitts's Law** - Larger touch targets (≥44px), closer actions
- **Grouping Effect** - Related items together, visual separation
- **Proximity Principle** - Related elements close together
- **Zeigarnik Effect** - Incomplete task indicators (badges, progress)
- **Serial Position Effect** - Important actions at top/bottom
- **Hick's Law** - Limit choices, progressive disclosure

### Material-UI Patterns

- `theme.spacing()` for consistent spacing
- `alpha()` for transparency
- `sx` prop instead of styled components
- Smooth transitions with `theme.transitions`
- Custom scrollbars
- Touch-friendly targets

---

## 🐳 Docker

### Build Image

```bash
docker build -t MarcusViniciusBarcelos/uiux-tools-react-mui .
```

### Run Server

```bash
docker run -i MarcusViniciusBarcelos/uiux-tools-react-mui
```

### Docker Hub

```bash
docker pull MarcusViniciusBarcelos/uiux-tools-react-mui
```

---

## 🛠️ Development

### Clone Repository

```bash
git clone https://github.com/MarcusViniciusBarcelos/uiux-tools-react-mui.git
cd uiux-tools-react-mui
npm install
```

### Run Locally

```bash
npm start
```

### Test with Inspector

```bash
npx @modelcontextprotocol/inspector node index.js
```

---

## 📄 License

MIT © Datacred Team

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🔗 Links

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Material-UI Documentation](https://mui.com/)
- [Nielsen Norman Group - 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [Laws of UX](https://lawsofux.com/)

---

## 📧 Support

- 🐛 [Report Issues](https://github.com/MarcusViniciusBarcelos/uiux-tools-react-mui/issues)
- 💬 [Discussions](https://github.com/MarcusViniciusBarcelos/uiux-tools-react-mui/discussions)

---

**Made with ❤️ for better UX/UI in React applications**
