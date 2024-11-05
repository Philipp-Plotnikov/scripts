#!/usr/bin/env python3

def long_division(dividend, divider):
    result, steps = get_division_result_and_steps(dividend, divider)
    formatted_result = get_division_format_output(
        dividend, divider, result, steps
    )
    return formatted_result


def get_division_result_and_steps(dividend, divider):
    dividend_str = str(dividend)
    result = ""
    remainder = 0
    steps = []
    for index, character in enumerate(dividend_str):
        current = remainder * 10 + int(character)
        quotient_digit = current // divider
        remainder = current % divider
        result += str(quotient_digit)
        if quotient_digit != 0 or index == len(dividend_str) - 1:
            steps.append(
                (current, quotient_digit * divider, remainder)
            )
    return (result, steps)


def get_division_format_output(dividend, divider, result, steps):
    dividend_str = str(dividend)
    formatted_result = f"{dividend}|{divider}\n"
    position = 0
    is_print_after_loop = True
    for index, step in enumerate(steps):
        current, product, remainder = step
        diff = current - product
        if index == 0:
            if product == 0:
                cleared_result = result.lstrip('0') or '0'
                formatted_result += f"{current}|{cleared_result}\n"
                is_print_after_loop = False
            else:
                indents = ' ' * (len(dividend_str) - len(str(product)))
                cleared_result = result.lstrip('0') or '0'
                formatted_result += f"{product}{indents}|{cleared_result}\n"
            if diff != 0:
                position += len(str(current)) - len(str(diff))
            else:
                position += len(str(current)) - 1 or 1
            continue
        if current == 0:
            continue
        if product == 0:
            indents = ' ' * (len(dividend_str) - len(str(current)))
            formatted_result += f"{indents}{current}\n"
            is_print_after_loop = False
        else:
            formatted_result += f"{' ' * position}{current}\n"
            indents = ' ' * (position + len(str(current)) - len(str(product)))
            formatted_result += f"{indents}{product}\n"
        if diff != 0:
            position += len(str(current)) - len(str(diff))
        else:
            position += len(str(current)) - 1 or 1
    if is_print_after_loop:
        if position == len(dividend_str):
            position -= 1
        formatted_result += f"{' ' * position}{remainder}\n"
    return formatted_result[0:-1]


def main():
    print(long_division(123, 123))
    print()
    print(long_division(1, 1))
    print()
    print(long_division(15, 3))
    print()
    print(long_division(3, 15))
    print()
    print(long_division(12345, 25))
    print()
    print(long_division(1234, 1423))
    print()
    print(long_division(87654532, 1))
    print()
    print(long_division(24600, 123))
    print()
    print(long_division(4567, 1234567))
    print()
    print(long_division(246001, 123))
    print()
    print(long_division(123456789, 531))
    print()
    print(long_division(425934261694251, 12345678))


if __name__ == '__main__':
    main()
