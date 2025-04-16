//app/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { checkShortLink } from "@/lib/checkShortLink"; // the server action
import { TextField, Button, Box, Paper } from "@mui/material";

export default function HomePage() {
  const [alias, setAlias] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortURL, setShortURL] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setShortURL("");

  const result = await checkShortLink(alias, url);

  if (!result.success) {
      // We got an error message back from the server
      setError(result.message);
      return;
  }

  // If success, build the short URL
  const newShortURL = `${window.location.origin}/${alias}`;
  setShortURL(newShortURL);
  }

  return (
      <main >
          <Box sx={{
              backgroundColor: "#e9f1fe",
              // height: "100vh;"
          }}>

            <Box sx={{
                backgroundColor: "#eebaff",
                fontFamily: "Helvetica",
                fontSize: "30px",
                paddingLeft: "10px",
                padding: "10px"
            }}>
                <h1>URL Shortener</h1>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                // backgroundColor: "#e9f1fe",
            }}>

                <Box>
                    <Box sx={{fontSize: "20px", margin: "auto", textAlign: "center" }}> <h1> Shorten your URL </h1> </Box>

                    <Paper sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#eebaff",
                        width: "100%",
                        margin: "auto",
                        padding: "10px 200px",
                        marginTop: "10px",
                        paddingBottom: "20px",
                    }}>

                        <Box sx={{ margin: "10px", width: "100%" }}>
                            <h1>1. Enter a URL</h1>
                            <h1>2. Give it an alias</h1>
                            <h1>3. Create the new, shorter link!</h1>
                        </Box>

                        <form onSubmit={handleSubmit}>

                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <TextField
                                    label="URL"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    variant="outlined"
                                    required
                                />

                                <TextField
                                    label="Alias"
                                    value={alias}
                                    onChange={(e) => setAlias(e.target.value)}
                                    variant="outlined"
                                    required
                                />

                                <Button type="submit" variant="contained">
                                    Shorten
                                </Button>

                            </Box>
                        </form>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {shortURL && (
                            <p>
                              Short URL: <a href={shortURL}>{shortURL}</a>
                            </p>
                        )}
                  </Paper>
              </Box>
          </Box>

          </Box>
      </main>
  );
}
