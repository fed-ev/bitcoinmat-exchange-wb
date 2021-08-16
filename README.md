# Step to work on codebase:

1. Clone project to your computer
2. Use the command `npm i` to install all dependencies
3. Create a index.html in src folder that contains this

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<script type="module" src="../dist/exchange.js"></script>
	</head>
	<body>
		<bitcoinmat-exchange
			bg="#1d1d1b"
			text="white"
			mobile="true"
		></bitcoinmat-exchange>
	</body>
</html>
```

4. For development run the command `npm run dev` and open a live server on the index.html
5. To build run the command 'npm run build'
6. When web component is completely finished create a cdn using jsdelivr for example pointing to the `exchange.js` in the dist folder