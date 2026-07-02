"""
String Reversal Utility

This module provides functions to reverse strings in various ways.
"""


def reverse_string(s):
    """
    Reverse a string using slicing.
    
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
    Reverse a string using a loop.
    
    Args:
        s (str): The string to reverse
        
    Returns:
        str: The reversed string
        
    Example:
        >>> reverse_string_loop("hello")
        'olleh'
    """
    reversed_str = ""
    for char in s:
        reversed_str = char + reversed_str
    return reversed_str


def reverse_string_recursion(s):
    """
    Reverse a string using recursion.
    
    Args:
        s (str): The string to reverse
        
    Returns:
        str: The reversed string
        
    Example:
        >>> reverse_string_recursion("hello")
        'olleh'
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
    test_string = "Hello, World!"
    
    print("Original string:", test_string)
    print("Reversed (slicing):", reverse_string(test_string))
    print("Reversed (loop):", reverse_string_loop(test_string))
    print("Reversed (recursion):", reverse_string_recursion(test_string))
    
    test_phrase = "The quick brown fox"
    print("\nOriginal phrase:", test_phrase)
    print("Words reversed:", reverse_words(test_phrase))
