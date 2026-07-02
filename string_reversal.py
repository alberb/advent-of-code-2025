"""
String Reversal Utilities

This module provides multiple methods to reverse strings in Python.
"""


def reverse_string(s):
    """
    Reverse a string using Python slicing.
    
    Args:
        s (str): The string to reverse
        
    Returns:
        str: The reversed string
        
    Example:
        >>> reverse_string("hello")
        'olleh'
    """
    return s[::-1]


def reverse_string_loop(s):
    """
    Reverse a string using a loop approach.
    
    Args:
        s (str): The string to reverse
        
    Returns:
        str: The reversed string
        
    Example:
        >>> reverse_string_loop("world")
        'dlrow'
    """
    result = ""
    for char in s:
        result = char + result
    return result


def reverse_string_recursion(s):
    """
    Reverse a string using recursion.
    
    Args:
        s (str): The string to reverse
        
    Returns:
        str: The reversed string
        
    Example:
        >>> reverse_string_recursion("python")
        'nohtyp'
    """
    if len(s) == 0:
        return s
    return reverse_string_recursion(s[1:]) + s[0]


def reverse_words(s):
    """
    Reverse the order of words in a string.
    
    Args:
        s (str): The string containing words separated by spaces
        
    Returns:
        str: The string with words in reversed order
        
    Example:
        >>> reverse_words("hello world python")
        'python world hello'
    """
    return " ".join(s.split()[::-1])


if __name__ == "__main__":
    # Test cases
    test_string = "hello"
    print(f"Original string: {test_string}")
    print(f"Reversed (slicing): {reverse_string(test_string)}")
    print(f"Reversed (loop): {reverse_string_loop(test_string)}")
    print(f"Reversed (recursion): {reverse_string_recursion(test_string)}")
    
    test_words = "hello world python"
    print(f"\nOriginal words: {test_words}")
    print(f"Reversed words: {reverse_words(test_words)}")
