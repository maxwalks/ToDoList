"use client";
import { useState } from 'react';
import { Button } from "./ui/button";
import { callOpenAI } from '@/utils/openai';
import { Loader2 } from "lucide-react";
import { getRandomPrompt } from '@/utils/prompts';

export function AISuggestion({ 
  onSuggestionSelect 
}: { 
  onSuggestionSelect: (suggestion: string) => void 
}) {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  const getSuggestion = async () => {
    setLoading(true);
    try {
      const messages = [
        {
          role: "system",
          content: "You are a helpful assistant that suggests specific, actionable tasks for a todo list. Keep suggestions concise and practical, under 100 characters when possible."
        },
        {
          role: "user",
          content: getRandomPrompt()
        }
      ];

      const response = await callOpenAI(messages);
      setSuggestion(response.content);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      {suggestion && (
        <div className="p-3 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">{suggestion}</p>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onSuggestionSelect(suggestion)}
            className="mt-2"
          >
            Use this suggestion
          </Button>
        </div>
      )}
      <Button
        onClick={getSuggestion}
        disabled={loading}
        variant="outline"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Getting suggestion...
          </>
        ) : (
          'Get AI Suggestion'
        )}
      </Button>
    </div>
  );
} 