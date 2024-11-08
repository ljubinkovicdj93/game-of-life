import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const Grid: React.FC = () => {
    const gridSize: number = 20;
    const totalCells: number = gridSize * gridSize;
    const updateInterval: number = 200;

    // Create a 2D array for the grid, with each cell initially set to "dead" (false)
    const [grid, setGrid] = useState<boolean[]>(
        Array(totalCells).fill(false) // 64 cells for an 8x8 grid
    );
    const [isRunning, setIsRunning] = useState(false);

    // Toggle cell state between alive (true) and dead (false)
    const toggleCellState = (index: number) => {
        setGrid((prevGrid) =>
            prevGrid.map((cell, i) => (i === index ? !cell : cell))
        );
    };

    const renderItem = ({ item, index }: { item: boolean; index: number }) => (
        <TouchableOpacity
            style={[styles.cell, item ? styles.aliveCell : styles.deadCell]}
            onPress={() => toggleCellState(index)}
        />
    );

    // GAME LOGIC
    const calculateNextGrid = () => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((cell, index) => {
                const neighborsCount = getNearestNeighborsCount(index, prevGrid);
                if (cell) {
                    return neighborsCount === 2 || neighborsCount === 3;
                } else {
                    return neighborsCount === 3;
                }
            });

            return newGrid;
        });
    };

    const getNearestNeighborsCount = (index: number, grid: boolean[]) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        let count = 0;

        for (let i: number = -1; i < 2; i++) {
            for (let j: number = -1; j < 2; j++) {
                if (i === 0 && j === 0) continue; // Skip the cell itself

                // Make sure we check against the other side of the square if out of bounds
                // ie: when row = 0 then checking row above or row = -1 will "wrap around" the square and check against row = gridSize - 1 instead.
                const rowToCheckAgainst = ((row + i) + gridSize) % gridSize
                const colToCheckAgainst = ((col + j) + gridSize) % gridSize

                const currIndex = row * gridSize + col

                // Translate row, col to index in a 1 dimensional array
                const newIndex = rowToCheckAgainst * gridSize + colToCheckAgainst;

                if (grid[newIndex]) {
                    count += 1;
                }
            }
        }

        return count;
    };

    // Use a timer to automatically update the grid if `isRunning` is true
    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            calculateNextGrid();
        }, updateInterval);

        return () => clearInterval(intervalId);
    }, [isRunning, grid]);

    const handleToggleSimulation = () => {
        setIsRunning(!isRunning);
    };

    const onClear = () => {
        setGrid((prevGrid) => {
            const newGrid = prevGrid.map((cell, index) => {
                return false;
            });

            return newGrid;
        });
    };

    return (
        <View>
            <FlatList
                data={grid}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                numColumns={gridSize}
                contentContainerStyle={styles.grid}
            />
            <View style={styles.buttonContainer}>
                <Button title={isRunning ? "Stop" : "Start"} onPress={handleToggleSimulation} />
                <Button title="Clear" onPress={onClear} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cell: {
        width: 40,
        height: 40,
        margin: 1,
        borderRadius: 2,
    },
    deadCell: {
        backgroundColor: '#ffffff',
    },
    aliveCell: {
        backgroundColor: '#333333',
    },
    buttonContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingHorizontal: 15
    }
});

export default Grid;
