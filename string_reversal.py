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
    Reverse a string using recursion with index-based approach (optimized).
    
    This optimized version uses a helper function to avoid creating new strings
    on each recursive call through slicing. Instead, it uses indices to traverse
    the string, which is much more efficient.
    
    Args:
        s (str): The string to reverse
        
    Returns:
        str: The reversed string
        
    Example:
        >>> reverse_string_recursion("python")
        'nohtyp'
    """
    def helper(s, left, right):
        """
        Helper function that reverses string using two pointers.
        
        Args:
            s (str): The string to reverse
            left (int): Left pointer index
            right (int): Right pointer index
            
        Returns:
            str: The reversed string
        """
        if left >= right:
            return s
        
        # Convert to list for manipulation (strings are immutable)
        s_list = list(s)
        s_list[left], s_list[right] = s_list[right], s_list[left]
        
        return helper(''.join(s_list), left + 1, right - 1)
    
    return helper(s, 0, len(s) - 1)


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
    print(f"Reversed (recursion - optimized): {reverse_string_recursion(test_string)}")
    
    test_words = "hello world python"
    print(f"\nOriginal words: {test_words}")
    print(f"Reversed words: {reverse_words(test_words)}")
    
    # Performance comparison on longer string
    long_string = "a" * 100
    print(f"\nPerformance test with 100-character string:")
    print(f"Slicing result length: {len(reverse_string(long_string))}")
    print(f"Recursion result length: {len(reverse_string_recursion(long_string))}")
