# weather app

[Demo Link](https://jiasong214.github.io/the-odin-project/weather-app/index.html)

## What I Learned

### 1. API

### 2. Asynchronous

1. fetch

```javascript
function logFetch(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error("fetch failed", err);
    });
}
```

2. async await
3. try catch finally

```javascript
async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.json());
  } catch (err) {
    console.log("fetch failed", err);
  }
}
```
