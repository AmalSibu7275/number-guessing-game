import {describe, it, expect} from "vitest";
import {generateRandomNumber, generateHint, grantExtraLife} from "./server";

describe('test of generateRandomNumber function', () => {

    it("should return a number between 1 and 10 for 'easy' difficulty", () => {
        for (let i = 0; i < 100; i++) {
            const result = generateRandomNumber("easy");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(10);
        }
    });

    it("should return a number between 1 and 50 for 'medium' difficulty", () => {
        for (let i = 0; i < 100; i++) {
            const result = generateRandomNumber("medium");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(50);
        }
    });

    it("should return a number between 1 and 100 for 'hard' difficulty", () => {
        for(let i = 0; i < 100; i++) {
            const result = generateRandomNumber("hard");
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(100);
        }
    });
});

describe('test of generateHint function', () => {
    it('should return "Too low!" if the guess is less than the random number', () => {
        const guess = 5;
        const randomNumber = 10;
        const result = generateHint(guess, randomNumber);
        expect(result).toBe("Too low!");
    });
    
    it('should return "Too high!" if the guess is greater than the random number', () => {
        const guess = 15;
        const randomNumber = 10;
        const result = generateHint(guess, randomNumber);
        expect(result).toBe("Too high!");
    });

    it ('should return "Correct!" if the guess equals the random number', () => {
        const guess = 10;
        const randomNumber = 10;
        const result = generateHint(guess, randomNumber);
        expect(result).toBe("Correct!");
    });
});

describe('test of grantExtraLife', () => {
    it('should grant an extra life if lives are below the maximum', () => {
        const gameState = { lives: 3 };
        const result = grantExtraLife(gameState);
        expect(result).toBe("You gained an extra life!");
        expect(gameState.lives).toBe(4);
    });

    it('should not grant an extra life if lives are at the maximum', () => {
        const gameState = { lives: 5 };
        const result = grantExtraLife(gameState);
        expect(result).toBe("Maximum lives reached!");
        expect(gameState.lives).toBe(5);
    });

    it('should correctly handle edge cases with lives at 0', () => {
        const gameState = { lives: 0 };
        const result = grantExtraLife(gameState);
        expect(result).toBe("You gained an extra life!");
        expect(gameState.lives).toBe(1);
    });
});