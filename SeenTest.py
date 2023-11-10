import matplotlib.pyplot as plt
import numpy as np
import random
import math

def random_index(arr):
    if not arr:
        return None
    else:
        return random.randint(0, len(arr) - 1)

def calculate_quantity_seen_after_n_selections(arr, n):
	for i in range(n):
		arr[random_index(arr)] = 1
	seen_count = 0
	for i in range(len(arr)):
		if (arr[i] == 1):
			seen_count += 1
	return seen_count

def display_histogram(data):
    # Set the number of bins
    num_bins = 30
    
    # Create histogram
    plt.hist(data, bins=num_bins, color='blue', alpha=0.7)

    # Set labels and title
    plt.xlabel('Value')
    plt.ylabel('Frequency')
    plt.title('Histogram with 30 Bins')

    # Show the plot
    plt.show()

def calculate_average(numbers):
	return sum(numbers) / len(numbers)


#simulate draw
num = 10000
data = []
cards_in_set = num
for i in range(num):
	print(i)
	arr = [0] * cards_in_set
	num_seen = calculate_quantity_seen_after_n_selections(arr, num)
	data.append(num_seen)



print(calculate_average(data))
