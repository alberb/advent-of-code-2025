use std::fs;

fn main() {
    let content = fs::read_to_string("input.txt")
        .expect("Failed to read input.txt");

    let lines: Vec<&str> = content.lines().collect();

    println!("{:?}", lines);

    let mut location = 50;
    let mut zero_counter = 0;

    for line in lines {
        println!("Location is currently: {}", location);
        let clean_line = line.trim();
        println!("Processing line: {}", clean_line);

        let direction = clean_line.chars().next().expect("Empty line");
        let distance: i32 = clean_line[1..].parse().expect("Failed to parse distance");

        match direction {
            'R' => location += distance,
            'L' => location -= distance,
            _ => {}
        }

        location = location % 100;

        if location == 0 {
            zero_counter += 1;
        }
    }

    println!("Number of times location was zero: {}", zero_counter);
}
