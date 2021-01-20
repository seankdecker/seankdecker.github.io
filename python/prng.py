#!python3
import sys # for argv
import random # for random()
import json
import random

DEFAULT_SEED = 230138123;

'''
simply use import random. Should be mersenne twister
'''
def python_random(count, seed=DEFAULT_SEED):
    return [random.random() for _ in range(count)]

'''
middle of the square method, from John Von Neumann
'''
def middle_square_method(count, seed=DEFAULT_SEED):
    res = []
    number = seed
    for _ in range(count):
        number = int(str(number * number).zfill(8)[2:6])  # zfill adds padding of zeroes
        res.append(float(number / 9999))
    return res


'''
The Central Randomizer, 1997 by Paul Houle (paul@honeylocust.com)
   "I wouldn't use it to keep secrets, but it's good for many uses." - Paul Houle
became popular because JavaScript 1.0 had no Math.random()
'''
def linear_congruential_generator(count, seed=DEFAULT_SEED):
    # with this setting of paremeters, called the Central Randomizer
    modulus = 2**31
    a, c = 7, 1
    res = []
    for _ in range(count):
        res.append(seed / modulus)
        seed = (seed*a+c) % modulus
    return res

'''
Mersenne Twister, by Makoto Matsumoto and Takuji Nishimura
'''
def mersenne_twister(count, seed=DEFAULT_SEED):
    # Period parameters
    N = 624 # degree of recurrence
    M = 397 # middle word, an offset used in the recurrence relation defining the series x, 1 <= m < n
    # w = 64
    # r = 1
    MATRIX_A = 0x9908b0df   # constant vector a, coefficients of the relational normal form twist matrix
    UPPER_MASK = 0x80000000 # most significant w-r bits
    LOWER_MASK = 0x7fffffff # least significant r bits

    # Tempering parameters
    TEMPERING_MASK_B = 0x9d2c5680
    TEMPERING_MASK_C = 0xefc60000
    TEMPERING_SHIFT_U = lambda y: (y >> 11)
    TEMPERING_SHIFT_S = lambda y: (y << 7)
    TEMPERING_SHIFT_T = lambda y: (y << 15)
    TEMPERING_SHIFT_L = lambda y: (y >> 18)
    
    # 
    matrix = {
        'state_matrix': [], # the array for the state matrixor
        'matrix_i': N+1# matrixi==N+1 means matrix[N] is not initialized
    }

    # initializing the array with a NONZERO seed
    def sgenrand(seed, matrix):
        # setting initial seeds to matrix[N] using
        # the generator Line 25 of Table 1 in
        # [KNUTH 1981, The Art of Computer Programming
        #    Vol. 2 (2nd Ed.), pp102]
        # init the N + 1 elements of the matrix
        matrix['state_matrix'] = [seed & 0xffffffff] # x_0
        for i in range(1, N + 1):
            matrix['state_matrix'].append((69069 * matrix['state_matrix'][i-1]) & 0xffffffff)
        matrix['matrix_i'] = i

    def genrand(matrix):
        mag01 = [0x0, MATRIX_A]
        # mag01[x] = x * MATRIX_A  for x=0,1
        y = 0
        if matrix['matrix_i'] >= N: # generate N words at one time
            if matrix['matrix_i'] == N+1:   # if sgenrand() has not been called,
                sgenrand(DEFAULT_SEED, matrix) # a default initial seed is used
            for kk in range((N-M) + 1):
                y = (matrix['state_matrix'][kk]&UPPER_MASK)|(matrix['state_matrix'][kk+1]&LOWER_MASK)
                matrix['state_matrix'][kk] = matrix['state_matrix'][kk+M] ^ (y >> 1) ^ mag01[y & 0x1]
            for kk in range(kk, N):
                y = (matrix['state_matrix'][kk]&UPPER_MASK)|(matrix['state_matrix'][kk+1]&LOWER_MASK)
                matrix['state_matrix'][kk] = matrix['state_matrix'][kk+(M-N)] ^ (y >> 1) ^ mag01[y & 0x1]
            y = (matrix['state_matrix'][N-1]&UPPER_MASK)|(matrix['state_matrix'][0]&LOWER_MASK)
            matrix['state_matrix'][N-1] = matrix['state_matrix'][M-1] ^ (y >> 1) ^ mag01[y & 0x1]

            matrix['matrix_i'] = 0
        y = matrix['state_matrix'][matrix['matrix_i']]
        matrix['matrix_i'] += 1
        y ^= TEMPERING_SHIFT_U(y)
        y ^= TEMPERING_SHIFT_S(y) & TEMPERING_MASK_B
        y ^= TEMPERING_SHIFT_T(y) & TEMPERING_MASK_C
        y ^= TEMPERING_SHIFT_L(y)
        return (float(y) / 0xffffffff) # reals

    def main(count, seed):
        res = []
        sgenrand(seed, matrix) # any nonzero integer can be used as a seed
        for j in range(count):
            res.append(genrand(matrix))
        return res
    return main(count, seed)

if __name__=='__main__':
    alg, count = sys.argv[1], int(sys.argv[2])
    seed, random_nums = DEFAULT_SEED, None
    if len(sys.argv) > 3:
        seed = int(sys.argv[3])
    if alg == 'python-random':
        random_nums = python_random(count, seed=seed)
    if alg == 'middle-square-method':
        random_nums = middle_square_method(count, seed=seed)
    if alg == 'linear-congruential-generator':
        random_nums = linear_congruential_generator(count, seed=seed)
    if alg == 'mersenne-twister':
        random_nums = mersenne_twister(count, seed=seed)
    if random_nums == None:
        raise 'random_nums is empty!'
    print(json.dumps({
            'randomNumbers': random_nums,
            'query': alg,
            'count': count,
            'seed': seed
            })
        )
    sys.stdout.flush()
