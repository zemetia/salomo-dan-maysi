
import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const CACHE_PREFIX = 'wedding_ai_img_';

export function useGeneratedImage(prompt: string, fallbackUrl: string) {
  const [imageUrl, setImageUrl] = useState<string>(fallbackUrl);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate a simple key based on the prompt
    const cacheKey = `${CACHE_PREFIX}${btoa(prompt.substring(0, 50)).replace(/[/+=]/g, '')}`;

    async function generate() {
      // 1. Check persistent cache first
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setImageUrl(cached);
        setIsLoading(false);
        return;
      }

      // 2. If not cached, attempt to generate
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: `${prompt}. Style: High-end wedding photography, soft warm tones, elegant, minimalist, cinematic lighting.` }],
          },
          config: {
            imageConfig: {
              aspectRatio: "3:4"
            }
          }
        });

        const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
        if (part?.inlineData) {
          const dataUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          
          // 3. Save to cache
          try {
            localStorage.setItem(cacheKey, dataUrl);
          } catch (storageError) {
            // Handle QuotaExceededError by clearing oldest items if needed, or just skip caching
            console.warn("Storage quota exceeded, image not cached.");
          }
          
          setImageUrl(dataUrl);
        } else {
          setImageUrl(fallbackUrl);
        }
      } catch (error: any) {
        console.error("Image generation failed:", error);
        // Specifically handle 429 Resource Exhausted by staying on fallback
        setImageUrl(fallbackUrl);
      } finally {
        setIsLoading(false);
      }
    }

    if (prompt) {
      generate();
    } else {
      setIsLoading(false);
    }
  }, [prompt, fallbackUrl]);

  return { imageUrl, isLoading };
}
